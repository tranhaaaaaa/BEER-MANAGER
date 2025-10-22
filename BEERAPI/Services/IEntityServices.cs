using BEERAPI.Models;

namespace BEERAPI.Services
{
    public interface IUserService : IServices<User>
    {
    }
    public interface IShopService : IServices<Shop>
    {
    }
    public interface IProductService : IServices<Product>
    {
    }
    public interface IOrderService : IServices<Order>
    {
    }
    public interface IOrderItemService : IServices<Orderitem>
    {
    }
    public interface ILoggingService : IServices<Logging>
    {
    }
        public interface ITableService : IServices<Table>
        {
        }
    
}
