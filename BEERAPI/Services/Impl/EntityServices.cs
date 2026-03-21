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
    public class UserService : BaseServices<User>, IUserService
    {
        public UserService(EcommerceDbContext context, IMemoryCache cache, IConfiguration configuration) : base(context, cache, configuration)
        {
        }
    }
    public class ShopService : BaseServices<Shop>, IShopService
    {
        public ShopService(EcommerceDbContext context, IMemoryCache cache, IConfiguration configuration) : base(context, cache, configuration)
        {
        }
    }
    public class ProductService : BaseServices<Product>, IProductService
    {
        public ProductService(EcommerceDbContext context, IMemoryCache cache, IConfiguration configuration) : base(context, cache, configuration)
        {
        }
    }
    public class OrderService : BaseServices<Order>, IOrderService
    {
        public OrderService(EcommerceDbContext context, IMemoryCache cache, IConfiguration configuration) : base(context, cache, configuration)
        {
        }
    }
    public class OrderItemService : BaseServices<OrderItem>, IOrderItemService
    {
        public OrderItemService(EcommerceDbContext context, IMemoryCache cache, IConfiguration configuration) : base(context, cache, configuration)
        {
        }
    }
    public class LoggingService : BaseServices<Logging>, ILoggingService
    {
        public LoggingService(EcommerceDbContext context, IMemoryCache cache, IConfiguration configuration) : base(context, cache, configuration)
        {
        }
    }
    public class TableService : BaseServices<Table>, ITableService
    {
        public TableService(EcommerceDbContext context, IMemoryCache cache, IConfiguration configuration) : base(context, cache, configuration)
        {
        }
    }
    public class CategoryService : BaseServices<Category>, ICategoryService
    {
        public CategoryService(EcommerceDbContext context, IMemoryCache cache, IConfiguration configuration) : base(context, cache, configuration)
        {
        }
    }
    public class TransactionService : BaseServices<BankTransaction>, ITransactionService
    {
        public TransactionService(EcommerceDbContext context, IMemoryCache cache, IConfiguration configuration) : base(context, cache, configuration)
        {
        }
    }

}
