using BEERAPI.Models;
using BEERAPI.Models.Helper;
using BEERAPI.Services.Helper;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BEERAPI.Services.Impl
{
    public class AuthenService : IAuthenService

    {
            private EcommerceDbContext _context;
            public AuthenService(EcommerceDbContext context)
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
                    shopId = user.ShopUid,
                };
            }
        private string GenerateToken(Shop shop)
        {
            var config = ConfigurationHelper.config;

            var securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(config["Jwt:Key"])
            );

            var credentials = new SigningCredentials(
                securityKey,
                SecurityAlgorithms.HmacSha256
            );

            var claims = new[]
            {
        new Claim("UserName", shop.Username),
        new Claim("Id", shop.ShopUid.ToString()),
    };

            var token = new JwtSecurityToken(
                config["Jwt:Issuer"],
                config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(int.Parse(config["TokenExpries"])),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private Shop GetUser(string username, string password)
            {
            var hashPassword = password;//Unity.Md5Hash(password);
                return _context.Shops.Where(c => c.Username.ToLower() == username.ToLower() && c.Password == hashPassword).FirstOrDefault();
            }
            public object Register(string username, string password)
            {
                var exist = _context.Shops
                    .FirstOrDefault(x => x.Username.ToLower() == username.ToLower());

                if (exist != null)
                {
                    return new
                    {
                        success = false,
                        message = "Username đã tồn tại"
                    };
                }

                var shop = new Shop
                {
                    ShopUid = Guid.NewGuid(),
                    Username = username,
                    Password = password, //Unity.Md5Hash(password),
                    CreatedAt = DateTime.Now,
                    ShopName = username,
                };

                _context.Shops.Add(shop);
                _context.SaveChanges();

                return new
                {
                    success = true,
                    message="Tao thanh cong"
                };
            }
        }
    }

