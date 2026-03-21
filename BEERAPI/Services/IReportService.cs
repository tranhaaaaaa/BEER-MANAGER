using BEERAPI.Models;

namespace BEERAPI.Services
{
    public interface IReportService
    {
        Task<List<OrderListReportDto>> GetOrderListReportDtos(DateTime orderDateStart, DateTime orderDateEnd);

        Task<Dictionary<int, decimal>> GetTotalAmountInDay(int? month, int? year);

        Task<Dictionary<int, decimal>> GetTotalAmountInMonth(int? year);
    }
}
