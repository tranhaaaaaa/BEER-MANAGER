using BEERAPI.Controllers;
using BEERAPI.Models;
using BEERAPI.Models.Helper;
using Microsoft.EntityFrameworkCore;
using static BEERAPI.Services.IOrderService;

namespace BEERAPI.Services.Impl
{
    public class CreateOrderService : ICreateOrderService
    {
        private readonly EcommerceDbContext _context;

        public CreateOrderService(EcommerceDbContext context)
        {
            _context = context;
        }

        public async Task<(Guid orderId, Guid tableId)> CreateTableOrder(CreateTableDTO dto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                Guid? userUid = dto.UserUid;

                if (userUid != null)
                {
                    var user = await _context.Users.FirstOrDefaultAsync(x => x.Uid == userUid);
                    if (user == null)
                    {
                        userUid = null;
                    }
                }

                if (userUid == null && dto.UserDTO != null)
                {
                    var newUser = new User
                    {
                        Uid = Guid.NewGuid(),
                        Name = dto.UserDTO.Name,
                        Address = dto.UserDTO.Address,
                        Phone = dto.UserDTO.Phone
                    };

                    _context.Users.Add(newUser);
                    await _context.SaveChangesAsync();
                    userUid = newUser.Uid;
                }

                var order = new Order
                {
                    OrderUid = Guid.NewGuid(),
                    Name = dto.Name,
                    OrderDate = DateTime.Now,
                    TotalAmount = 0,
                    Status = 0,
                    PaymentType = 2, // Ký nợ trước hết các order
                    ShopUid = dto.ShopUid.Value,
                    UserUid = dto.UserUid
                    //UserUid = Guid.Parse("A98795B9-0A05-480C-9D0E-29145F34E0FF")
                };

                _context.Orders.Add(order);
                await _context.SaveChangesAsync(); // insert Order trước

                var table = new Table
                {
                    TableId = Guid.NewGuid(),
                    Name = dto.Name,
                    OrderId = order.OrderUid
                };

                _context.Tables.Add(table);

                decimal total = 0;
                var orderItems = new List<OrderItem>();

                if (dto.ProductInfoDTOs != null)
                {
                    foreach (var item in dto.ProductInfoDTOs)
                    {
                        int qty = Convert.ToInt32(item.qty);
                        decimal price = item.price ?? 0;

                        orderItems.Add(new OrderItem
                        {
                            OrderItemUid = Guid.NewGuid(),
                            OrderUid = order.OrderUid,
                            ProductUid = item.id,
                            Name = item.name,
                            Quantity = qty,
                            UnitPrice = price
                        });

                        total += qty * price;
                    }
                }
                order.Type = dto.Type;
                order.TotalAmount = total;

                _context.OrderItems.AddRange(orderItems);

                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return (order.OrderUid, table.TableId);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception("Create order failed: " + ex.Message);
            }
        }
        public ApiResponse<string> UpdateOrder(Guid orderUid, CreateTableDTO dto)
        {
            var order = _context.Orders.FirstOrDefault(x => x.OrderUid == orderUid);

            if (order == null)
            {
                return new ApiResponse<string>
                {
                    Status = 404,
                    IsSuccess = false,
                    Message = "Order not found"
                };
            }

            // update name
            order.Name = dto.Name;

            // xoá order item cũ
            var oldItems = _context.OrderItems
                .Where(x => x.OrderUid == orderUid)
                .ToList();

            _context.OrderItems.RemoveRange(oldItems);

            decimal totalAmount = 0;

            foreach (var item in dto.ProductInfoDTOs)
            {
                var price = item.price ?? 0;
                var amount = price * item.qty;

                var orderItem = new OrderItem
                {
                    OrderItemUid = Guid.NewGuid(),
                    OrderUid = orderUid,
                    ProductUid = item.id,
                    Quantity = item.qty,
                    UnitPrice = price,
                    Name = item.name
                };

                totalAmount += amount;

                _context.OrderItems.Add(orderItem);
            }
            order.Type = dto.Type;
            order.TotalAmount = totalAmount;

            _context.SaveChanges();

            return new ApiResponse<string>
            {
                Status = 200,
                IsSuccess = true,
                Message = "Update order success"
            };
        }
    }
}