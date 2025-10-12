using BEERAPI.Models;
using BEERAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static BEERAPI.Services.IOrderService;

namespace BEERAPI.Controllers
{
    public class UsersController : BaseController<User>
    {

        public UsersController(IUserService service) : base(service)
        {
        }

    }
    public class ShopsController : BaseController<Shop>
    {

        public ShopsController(IShopService service) : base(service)
        {
        }

    }
    public class ProductsController : BaseController<Product>
    {

        public ProductsController(IProductService service) : base(service)
        {
        }

    }
    public class OrdersController : BaseController<Order>
    {

        public OrdersController(IOrderService service) : base(service)
        {
        }

    }
    public class OrderItemsController : BaseController<OrderItem>
    {

        public OrderItemsController(IOrderItemService service) : base(service)
        {
        }

    }
    public class TablesController : BaseController<Table>
    {

        public TablesController(ITableService service) : base(service)
        {
        }

    }
    public class LoggingController : BaseController<Logging>
    {

        public LoggingController(ILoggingService service) : base(service)
        {
        }

    }
    public class CustomController : Controller
    {
        private IUserService userService;
        private IAuthenticationService authenticationService;

        public CustomController(IUserService _userService, IAuthenticationService _authenticationService)
        {
            this.authenticationService = _authenticationService;
            this.userService = _userService;
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("Authentication/Login")]
        public ActionResult Login([FromBody] UserLogin userLogin)
        {
            return Ok(authenticationService.Login(userLogin.Username, userLogin.Password));
        }
       
    }
    public class UserLogin
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public int UserId { get; set; }
    }
}
