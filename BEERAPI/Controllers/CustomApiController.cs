using BEERAPI.HubTransactions;
using BEERAPI.Models;
using BEERAPI.Models.Transaction;
using BEERAPI.Services;
using BEERAPI.Services.Impl;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Globalization;
using System.Text.RegularExpressions;

namespace BEERAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomApiController : ControllerBase
    {
        private readonly ICreateOrderService _service;
        private readonly EcommerceDbContext _context;
        private readonly IHubContext<PaymentHub> _hubContext;
        public CustomApiController(ICreateOrderService service, EcommerceDbContext context, IHubContext<PaymentHub> hubContext)
        {
            _service = service;
            _hubContext = hubContext;
            _context = context;
        }

        [HttpPost("create-table-order")]
        public async Task<IActionResult> CreateTableOrder([FromBody] CreateTableDTO dto)
        {
            try
            {
                var result = await _service.CreateTableOrder(dto);

                return Ok(new
                {
                    orderId = result.orderId,
                    tableId = result.tableId,
                    message = "Create success"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = "Create failed",
                    error = ex.Message
                });
            }
        }
        [HttpGet("order-items/{orderUid}")]
        public IActionResult GetOrderItems(Guid orderUid)
        {
            var order = _context.Orders
                .Where(o => o.OrderUid == orderUid)
                .Select(o => new OrderItemsResponseDTO
                {
                    OrderUid = o.OrderUid,
                    OrderName = o.Name,
                    Type = o.Type,
                    TotalAmount = o.TotalAmount,
                    Items = o.OrderItems.ToList()
                })
                .FirstOrDefault();

            if (order == null)
            {
                return NotFound(new ApiResponse<object>
                {
                    Status = 404,
                    IsSuccess = false,
                    Data = null,
                    Message = "Order not found"
                });
            }

            return Ok(new ApiResponse<OrderItemsResponseDTO>
            {
                Status = 200,
                IsSuccess = true,
                Data = order,
                Message = "Get order items success"
            });
        }
        [HttpPut("update-order/{orderUid}")]
        public IActionResult UpdateOrder(Guid orderUid, [FromBody] CreateTableDTO dto)
        {
            var result = _service.UpdateOrder(orderUid, dto);
            return StatusCode(result.Status, result);
        }
        [HttpPost("create-user")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDTO dto)
        {
            if (dto == null)
            {
                return BadRequest(new
                {
                    message = "Data null"
                });
            }

            var user = new User
            {
                Uid = Guid.NewGuid(),
                Name = dto.Name,
                Phone = dto.Phone,
                Address = dto.Address,
                ShopUid = dto.ShopUID.Value,
                CreatedAt = DateTime.Now
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<User>
            {
                Status = 201,
                IsSuccess = true,
                Data = user,
                Message = "Create user success"
            });
        }
        private Guid? ExtractOrderId(string content)
        {
            if (string.IsNullOrWhiteSpace(content))
                return null;

            var index = content.IndexOf("ODR", StringComparison.OrdinalIgnoreCase);
            if (index == -1) return null;

            var rawPart = content.Substring(index + 3);

            var clean = Regex.Replace(rawPart, @"[^0-9a-fA-F]", "");

            if (clean.Length < 32) return null;

            var hex = clean.Substring(0, 32);

            var formatted = $"{hex.Substring(0, 8)}-" +
                            $"{hex.Substring(8, 4)}-" +
                            $"{hex.Substring(12, 4)}-" +
                            $"{hex.Substring(16, 4)}-" +
                            $"{hex.Substring(20, 12)}";

            if (Guid.TryParse(formatted, out Guid result))
                return result;

            return null;
        }
        [HttpPost("test")]
        public async Task<IActionResult> TestHub()
        {
            await _hubContext.Clients.All.SendAsync("payment_success", new
            {
                orderId = "40F3BC1C-1C3F-4306-A854-F32B2109403C",
                amount = 100,
                content = "Test payment from API"
            });

            return Ok("Sent test message");
        }
        [HttpPost("webhook")]
        public async Task<IActionResult> ReceiveWebhook([FromBody] SePayWebhookModel model)
        {
            using var transactionDb = await _context.Database.BeginTransactionAsync();

            try
            {
                Console.WriteLine($"Nhận giao dịch: {model.Id} - {model.TransferAmount}");

                var existed = await _context.BankTransactions
                    .FirstOrDefaultAsync(x => x.Id == model.Id);

                if (existed != null)
                {
                    return Ok(new { status = "duplicate" });
                }

                Guid? orderCode = ExtractOrderId(model.Content);

                var transaction = new BankTransaction
                {
                    Id = model.Id,
                    Gateway = model.Gateway,
                    TransactionDate = DateTime.TryParseExact(
                            model.TransactionDate,
                            "yyyy-MM-dd HH:mm:ss",
                            CultureInfo.InvariantCulture,
                            DateTimeStyles.None,
                            out var dt
                        ) ? dt : DateTime.Now,
                    AccountNumber = model.AccountNumber,
                    SubAccount = model.SubAccount,
                    TransferType = model.TransferType,
                    TransferAmount = model.TransferAmount,
                    Content = model.Content,
                    Description = model.Description,
                    ReferenceCode = model.ReferenceCode,
                    Accumulated = model.Accumulated,
                    RawJson = JsonConvert.SerializeObject(model),
                    Status = 0,
                    ExtractedOrderCode = orderCode.ToString(),
                    CreatedAt = DateTime.Now
                };
                if (model.TransferType == "in" && orderCode != null)
                {
                    var order = await _context.Orders
                        .FirstOrDefaultAsync(x => x.OrderUid == orderCode);

                    if (order != null)
                    {
                        transaction.OrderId = order.OrderUid;
                        transaction.Status = 1;
                        order.Status = 1;
                        order.PaymentType = 0;

                        Console.WriteLine($"Match thành công Order: {orderCode}");
                        await _hubContext.Clients.All.SendAsync("payment_success", new
                        {
                            orderId = orderCode.ToString(),
                            amount = model.TransferAmount,
                            content = "Test payment from API"
                        });
                    }
                    else
                    {
                        transaction.Status = -1;
                    }
                }

                _context.BankTransactions.Add(transaction);
                await _context.SaveChangesAsync();
                await transactionDb.CommitAsync();
                if (model.TransferType == "in" && orderCode != null && transaction.Status == 1)
                {
                    await _hubContext.Clients.All.SendAsync("payment_success", new
                    {
                        orderId = orderCode.ToString(),
                        amount = model.TransferAmount,
                        content = "Test payment from API"
                    });
                }

                return Ok(new { status = "success" });
            }
            catch (Exception ex)
            {
                await transactionDb.RollbackAsync();
                Console.WriteLine(ex.Message);
                return BadRequest(new { status = "error" });
            }
        }

        [HttpPost("cash-payment")]
        public async Task<IActionResult> CashPayment(Guid orderId)
        {
            using var transactionDb = await _context.Database.BeginTransactionAsync();

            try
            {
                var order = await _context.Orders
                    .FirstOrDefaultAsync(x => x.OrderUid == orderId);

                if (order == null)
                {
                    return NotFound(new { status = "order_not_found" });
                }

                if (order.Status == 1)
                {
                    return Ok(new { status = "already_paid" });
                }

                order.Status = 1;
                order.PaymentType = 1;

                await _context.SaveChangesAsync();
                await transactionDb.CommitAsync();

                await _hubContext.Clients.All.SendAsync("payment_success", new
                {
                    orderId = orderId.ToString(),
                    amount = order.TotalAmount,
                    content = "Thanh toán tiền mặt"
                });

                return Ok(new { status = "success" });
            }
            catch (Exception ex)
            {
                await transactionDb.RollbackAsync();
                Console.WriteLine(ex.Message);
                return BadRequest(new { status = "error" });
            }
        }

        [HttpPost("save-debt")]
        public async Task<IActionResult> SaveDebtPayment(Guid orderId)
        {
            using var transactionDb = await _context.Database.BeginTransactionAsync();

            try
            {
                var order = await _context.Orders
                    .FirstOrDefaultAsync(x => x.OrderUid == orderId);

                if (order == null)
                {
                    return NotFound(new { status = "order_not_found" });
                }

                if (order.Status == 1)
                {
                    return Ok(new { status = "already_paid" });
                }

                order.Status = 0;
                order.PaymentType = 2;

                await _context.SaveChangesAsync();
                await transactionDb.CommitAsync();

                await _hubContext.Clients.All.SendAsync("payment_debt", new
                {
                    orderId = orderId.ToString(),
                    amount = order.TotalAmount,
                    content = "Ký nợ"
                });

                return Ok(new { status = "success" });
            }
            catch (Exception ex)
            {
                await transactionDb.RollbackAsync();
                Console.WriteLine(ex.Message);
                return BadRequest(new { status = "error" });
            }
        }
    }
}