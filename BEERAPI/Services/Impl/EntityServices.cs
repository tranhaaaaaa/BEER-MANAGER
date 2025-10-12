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
    public class AuthenticationService : IAuthenticationService
    {
        private EcommerceDbContext _context;
        public AuthenticationService(EcommerceDbContext context)
        {
            _context = context;
        }

        public object Login(string username, string password)
        {
            var user = GetUser(username, password);
            if (user == null)
            {
                return null;
            }
            List<object> roles = null;

            return new
            {
                token = GenerateToken(user),
                username = user.Username,
                userid = user.ShopUid,
            };
        }
        private string GenerateToken(Shop shop)
        {
            var config = ConfigurationHelper.config;
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt.Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            //var roles = user.UserRoles.Select(c => c.Role).ToList();
          
            var claims = new[]
            {
                new Claim("UserName",shop.Username),
                new Claim("Id",shop.ShopUid.ToString()),

            };
            var token = new JwtSecurityToken(config["Jwt.Issuer"],
                config["Jwt.Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(int.Parse(config["TokenExpries"])),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);

        }
        private Shop GetUser(string username, string password)
        {
            var hashPassword = Unity.Md5Hash(password);
            return _context.Shops.Where(c => c.Username.ToLower() == username.ToLower() && c.Password == hashPassword).FirstOrDefault();
        }
    }
}
