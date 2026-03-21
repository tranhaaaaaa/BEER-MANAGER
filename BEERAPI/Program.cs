using BEERAPI.HubTransactions;
using BEERAPI.Models;
using BEERAPI.Models.Helper;
using BEERAPI.Services;
using BEERAPI.Services.Impl;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using Microsoft.OpenApi.Models;
using System.Diagnostics.Metrics;
using System.Text;
using static BEERAPI.Services.IOrderService;

IConfiguration configuration = new ConfigurationBuilder()
                            .AddJsonFile("appsettings.json")
                            .Build();

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
builder.Services.AddRazorPages();
IServiceCollection services = builder.Services;
services.AddControllers().AddJsonOptions(x =>
{
    x.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    x.JsonSerializerOptions.PropertyNamingPolicy = null;
    x.JsonSerializerOptions.WriteIndented = true;
}).AddOData(options => options.Select().Filter().OrderBy().Expand().EnableQueryFeatures().AddRouteComponents(GetEdmModel()));
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.MaxRequestBodySize = int.MaxValue;
});
var connectionString = builder.Configuration.GetConnectionString("value");

builder.Services.AddDbContext<EcommerceDbContext>(options =>
{
    options.UseSqlServer(connectionString);
    //options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

services.AddRouting();
services.AddTransient<IUserService, UserService>();
services.AddTransient<IShopService, ShopService>();
services.AddTransient<IProductService, ProductService>();
services.AddTransient<IOrderService, OrderService>();
services.AddTransient<IOrderItemService, OrderItemService>();
services.AddTransient<ILoggingService, LoggingService>();
services.AddTransient<ITableService, TableService>();
services.AddTransient<ICreateOrderService, CreateOrderService>();
services.AddTransient<ICategoryService, CategoryService>();
services.AddTransient<IAuthenService, AuthenService>();
services.AddTransient<ITransactionService, TransactionService>();
services.AddTransient<IReportService, ReportService>();


services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Mirror API", Version = "v1", Description = "Version: 1.0.0" });

});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy
            .SetIsOriginAllowed(origin =>
                origin == "http://localhost:4200" ||
                origin.StartsWith("https://nightless-enthrallingly-samira.ngrok-free.dev") // thêm URL ngrok
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials(); // 🔥 bắt buộc cho SignalR
    });
});
var app = builder.Build();
// Configure the HTTP request pipeline.
app.UseHostFiltering();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    //c.SwaggerEndpoint("/swagger/v1/swagger.json", "V1 Docs");
    //c.RoutePrefix = "DocumentAPI";

});

ConfigurationHelper.Initialize(builder.Configuration);
app.UseHttpsRedirection();
//Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("MDAxQDMxMzkyZTM0MmUzMGp6WDJ5ZGZrekFQY3huQkxTYkVmdS9jUERCbUVRUlhDb2lwc1FzQWxCVHM9");
//var valid = Syncfusion.Licensing.SyncfusionLicenseProvider.ValidateLicense(Syncfusion.Licensing.Platform.ASPNETCore);
app.UseRouting();
app.UseCors("AllowAngular");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
// Trong Program.cs
app.MapHub<PaymentHub>("/paymentHub", options =>
{
    options.Transports = Microsoft.AspNetCore.Http.Connections.HttpTransportType.WebSockets;
});
app.Run();

IEdmModel GetEdmModel()
{
    var odataBuilder = new ODataConventionModelBuilder();
    odataBuilder.EntitySet<User>("Users").EntityType.HasKey(x => x.Uid).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Shop>("Shops").EntityType.HasKey(x => x.ShopUid).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Product>("Products").EntityType.HasKey(x => x.ProductUid).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Order>("Orders").EntityType.HasKey(x => x.OrderUid).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<OrderItem>("OrderItems").EntityType.HasKey(x => x.OrderItemUid).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Logging>("Logs").EntityType.HasKey(x => x.LogUid).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Category>("Categories").EntityType.HasKey(x => x.Id).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<BEERAPI.Models.Table>("Tables").EntityType.HasKey(x => x.TableId).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<BankTransaction>("Transactions").EntityType.HasKey(x => x.Id).Expand(5).Count().Page(100, 100);

    return odataBuilder.GetEdmModel();
}                                              