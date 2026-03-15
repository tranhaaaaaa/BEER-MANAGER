using BEERAPI.Models;
using BEERAPI.Services;
using BEERAPI.Services.Impl;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BEERAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomApiController : ControllerBase
    {
        private readonly ICreateOrderService _service;
        private readonly EcommerceDbContext _context;
        public CustomApiController(ICreateOrderService service, EcommerceDbContext context)
        {
            _service = service;
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
                ShopUid = dto.ShopUID,
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
    }
}