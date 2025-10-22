using BEERAPI.Models;
using BEERAPI.Models.Helper;
using BEERAPI.Services;
using BEERAPI.Services.Impl;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ===== Configuration =====
IConfiguration configuration = builder.Configuration;

// ===== Services =====
builder.Services.AddRazorPages();

builder.Services.AddControllers()
    .AddJsonOptions(x =>
    {
        x.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        x.JsonSerializerOptions.PropertyNamingPolicy = null;
        x.JsonSerializerOptions.WriteIndented = true;
    })
    .AddOData(options => options.Select().Filter().OrderBy().Expand().EnableQueryFeatures()
        .AddRouteComponents(GetEdmModel()));

builder.Services.AddDbContext<EcommerceDbContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = configuration["Jwt:Issuer"],
            ValidAudience = configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]))
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IShopService, ShopService>();
builder.Services.AddTransient<IProductService, ProductService>();
builder.Services.AddTransient<IOrderService, OrderService>();
builder.Services.AddTransient<IOrderItemService, OrderItemService>();
builder.Services.AddTransient<ILoggingService, LoggingService>();
builder.Services.AddTransient<ITableService, TableService>();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Mirror API",
        Version = "v1",
        Description = "Version: 1.0.0"
    });
});

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseRouting();

app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
ConfigurationHelper.Initialize(configuration);
app.MapControllers();
app.Run();

IEdmModel GetEdmModel()
{
    var odataBuilder = new ODataConventionModelBuilder();

    odataBuilder.EntitySet<User>("Users").EntityType.HasKey(x => x.Uid).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Shop>("Shops").EntityType.HasKey(x => x.Shopuid).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Product>("Products").EntityType.HasKey(x => x.Productuid).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Order>("Orders").EntityType.HasKey(x => x.Orderuid).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Orderitem>("OrderItems").EntityType.HasKey(x => x.Orderitemuid).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Logging>("Logs").EntityType.HasKey(x => x.Loguid).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<BEERAPI.Models.Table>("Tables").EntityType.HasKey(x => x.Tableid).Expand(5).Count().Page(100, 100);
    return odataBuilder.GetEdmModel();
}
