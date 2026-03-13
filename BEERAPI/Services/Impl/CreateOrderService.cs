using BEERAPI.Models;
using BEERAPI.Models.Helper;
using BEERAPI.Services.Helper;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static BEERAPI.Services.IOrderService;

namespace BEERAPI.Services.Impl
{
    public class CreateOrderService : ICreateOrderServices
    {
        private readonly EcommerceDbContext _context;
        public async Task<(Guid orderId, Guid tableId)> CreateTableOrder(CreateTableDTO dto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var order = new Order
                {
                    OrderUid = Guid.NewGuid(),
                    Name = dto.Name,
                    OrderDate = DateTime.Now,
                    TotalAmount = 0
                };

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                var table = new Table
                {
                    TableId = Guid.NewGuid(),
                    Name = dto.Name,
                    OrderId = order.OrderUid
                };

                _context.Tables.Add(table);
                await _context.SaveChangesAsync();

                decimal total = 0;

                foreach (var item in dto.ProductInfoDTOs)
                {
                    var qty = Convert.ToInt32(item.qty);
                    var price = item.price ?? 0;

                    var orderItem = new OrderItem
                    {
                        OrderItemUid = Guid.NewGuid(),
                        OrderUid = order.OrderUid,
                        ProductUid = item.id,
                        Name = item.name,
                        Quantity = qty,
                        UnitPrice = price
                    };

                    total += qty * price;

                    _context.OrderItems.Add(orderItem);
                }

                await _context.SaveChangesAsync();

                order.TotalAmount = total;
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return (order.OrderUid, table.TableId);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
        }
    }