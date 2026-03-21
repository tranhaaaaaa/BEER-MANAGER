using BEERAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BEERAPI.Services.Impl
{
    public class ReportService : IReportService
    {
        private readonly EcommerceDbContext _context;

        public ReportService(EcommerceDbContext context)
        {
            _context = context;
        }

        public async Task<List<OrderListReportDto>> GetOrderListReportDtos(DateTime orderDateStart, DateTime orderDateEnd)
        {
            var reportData = await (from order in _context.Orders
                                    //join table in _context.Tables on order.OrderUid equals table.OrderId
                                    //join orderItem in _context.OrderItems on order.OrderUid equals orderItem.OrderUid
                                    //join product in _context.Products on orderItem.ProductUid equals product.ProductUid
                                    join category in _context.Categories on order.Type equals category.Id
                                    select new OrderListReportDto
                                    {
                                        OrderUid = order.OrderUid,
                                        Name = order.Name,
                                        OrderDate = order.OrderDate.Value,
                                        TotalAmount = order.TotalAmount.Value,
                                        Status = order.Status,
                                        PaymentType = order.PaymentType,
                                        ShopUid = order.ShopUid,
                                        Type = order.Type.Value,
                                        TypeName = category.Name
                                        //TableName = table.Name,
                                        //ProductName = product.Name,
                                        //Quantity = orderItem.Quantity,
                                        //Price = orderItem.Price
                                    })
                                    .Where(o => o.OrderDate.Date >= orderDateStart.Date && o.OrderDate.Date <= orderDateEnd.Date)
                                    .ToListAsync();
            return reportData;
        }

        public Task<Dictionary<int, decimal>> GetTotalAmountInDay(int? month, int? year)
        {
            var rawResult = _context.Orders.Where(o => o.OrderDate.HasValue && o.OrderDate.Value.Month == month && o.OrderDate.Value.Year == year)
                .GroupBy(o => o.OrderDate.Value.Day)
                .Select(g => new
                {
                    Day = g.Key,
                    TotalAmount = g.Sum(o => o.TotalAmount) ?? 0
                })
                .ToDictionary(x => x.Day, x => x.TotalAmount);

            int daysInMonth = DateTime.DaysInMonth(year ?? DateTime.Now.Year, month ?? DateTime.Now.Month);

            var result = Enumerable.Range(1, daysInMonth)
                .ToDictionary(day => day, day => rawResult.ContainsKey(day) ? rawResult[day] : 0);

            return Task.FromResult(result);
        }

        public Task<Dictionary<int, decimal>> GetTotalAmountInMonth(int? year)
        {
            var rawResult = _context.Orders.Where(o => o.OrderDate.HasValue && o.OrderDate.Value.Year == year)
                .GroupBy(o => o.OrderDate.Value.Month)
                .Select(g => new
                {
                    Month = g.Key,
                    TotalAmount = g.Sum(o => o.TotalAmount) ?? 0
                })
                .ToDictionary(x => x.Month, x => x.TotalAmount);

            var result = Enumerable.Range(1, 12)
                .ToDictionary(month => month, month => rawResult.ContainsKey(month) ? rawResult[month] : 0);

            return Task.FromResult(result);
        }
    }
}
