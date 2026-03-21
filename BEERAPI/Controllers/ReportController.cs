using BEERAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BEERAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet("order-list")]
        public async Task<IActionResult> GetOrderListReportDtos(DateTime orderDateStart, DateTime orderDateEnd)
        {
            var reportData = await _reportService.GetOrderListReportDtos(orderDateStart, orderDateEnd);
            return Ok(reportData);
        }

        [HttpGet("total-amount-in-day")]
        public async Task<IActionResult> GetTotalAmountInDay(int? month ,int? year)
        {
            var result = await _reportService.GetTotalAmountInDay(month, year);
            return Ok(result);
        }

        [HttpGet("total-amount-in-month")]
        public async Task<IActionResult> GetTotalAmountInMonth(int? year)
        {
            var result = await _reportService.GetTotalAmountInMonth(year);
            return Ok(result);
        }
    }
}
