using BEERAPI.Models;

namespace BEERAPI.Services
{
    public interface ICreateOrderServices
    {
        Task<(Guid orderId, Guid tableId)> CreateTableOrder(CreateTableDTO dto);
    }
}
