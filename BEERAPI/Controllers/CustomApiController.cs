using BEERAPI.Models;
using BEERAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BEERAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomApiController : ControllerBase
    {
        private readonly ICreateOrderServices _service;

        public CustomApiController(ICreateOrderServices service)
        {
            _service = service;
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
    }
}