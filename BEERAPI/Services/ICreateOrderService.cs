using BEERAPI.Controllers;
using BEERAPI.Models;

namespace BEERAPI.Services
{
    public interface ICreateOrderService
    {
        Task<(Guid orderId, Guid tableId)> CreateTableOrder(CreateTableDTO dto);
        ApiResponse<string> UpdateOrder(Guid orderUid, CreateTableDTO dto);
    }
}
