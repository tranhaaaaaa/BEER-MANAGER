using BEERAPI.Models;
using BEERAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
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
    public class CategoriesController : BaseController<Category>
    {
        public CategoriesController(ICategoryService service) : base(service)
        {

        }
    }
    public class TransactionsController : BaseController<BankTransaction>
    {
        public TransactionsController(ITransactionService service) : base(service)
        {
        }
    }
    public class CustomController : Controller
    {
        private IUserService userService;
        private IAuthenService authenticationService;

        public CustomController(IUserService _userService, IAuthenService _authenticationService)
        {
            authenticationService = _authenticationService;
            this.userService = _userService;
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("Authentication/Login")]
        public ActionResult<ApiResponse<object>> Login([FromBody] UserLogin userLogin)
        {
            var result = authenticationService.Login(userLogin.Username, userLogin.Password);

            if (result == null)
            {
                return Ok(new ApiResponse<object>
                {
                    Status = 400,
                    IsSuccess = false,
                    Message = "Sai tài khoản hoặc mật khẩu",
                    Data = null
                });
            }

            return Ok(new ApiResponse<object>
            {
                Status = 200,
                IsSuccess = true,
                Message = "Đăng nhập thành công",
                Data = result
            });
        }
        [HttpPost("register")]
        public IActionResult Register([FromBody] UserLogin req)
        {
            var result = authenticationService.Register(req.Username, req.Password);
            return Ok(result);
        }
    }
    public class UserLogin
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public int UserId { get; set; }
    }
}
