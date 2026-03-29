using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BEERAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCodeFirst : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BankTransaction",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false),
                    Gateway = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    TransactionDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    AccountNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SubAccount = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    TransferType = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    TransferAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReferenceCode = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Accumulated = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    RawJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true, defaultValue: 0),
                    OrderID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ExtractedOrderCode = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__BankTran__3214EC078A315079", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Category__3214EC07C123412E", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Shop",
                columns: table => new
                {
                    ShopUID = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    ShopName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Username = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Password = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    Img = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Shop__5DD995CC9AA24EB6", x => x.ShopUID);
                });

            migrationBuilder.CreateTable(
                name: "Table",
                columns: table => new
                {
                    TableID = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    OrderID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Table__7D5F018E1216FD52", x => x.TableID);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    ProductUID = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    ShopUID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Stock = table.Column<int>(type: "int", nullable: true, defaultValue: 0),
                    Type = table.Column<int>(type: "int", nullable: true, defaultValue: 0),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    PriceConfig = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Img = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Category = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Product__ADC6EB5B72584E7C", x => x.ProductUID);
                    table.ForeignKey(
                        name: "FK_Product_Category",
                        column: x => x.Category,
                        principalTable: "Category",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Product__ShopUID__5FB337D6",
                        column: x => x.ShopUID,
                        principalTable: "Shop",
                        principalColumn: "ShopUID");
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    UID = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Address = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    ShopUID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__User__C5B1960282B28074", x => x.UID);
                    table.ForeignKey(
                        name: "FK__User__ShopUID__534D60F1",
                        column: x => x.ShopUID,
                        principalTable: "Shop",
                        principalColumn: "ShopUID");
                });

            migrationBuilder.CreateTable(
                name: "Logging",
                columns: table => new
                {
                    LogUID = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    UserUID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Action = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TableName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Level = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    RecordUID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Logging__D12CCB367042FDA1", x => x.LogUID);
                    table.ForeignKey(
                        name: "FK__Logging__UserUID__71D1E811",
                        column: x => x.UserUID,
                        principalTable: "User",
                        principalColumn: "UID");
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    OrderUID = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    UserUID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    OrderDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    Status = table.Column<int>(type: "int", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true, defaultValue: 0m),
                    PaymentType = table.Column<int>(type: "int", nullable: false),
                    ShopUID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Type = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Order__EF45ED22EF65FC3F", x => x.OrderUID);
                    table.ForeignKey(
                        name: "FK__Order__ShopUID__656C112C",
                        column: x => x.ShopUID,
                        principalTable: "Shop",
                        principalColumn: "ShopUID");
                    table.ForeignKey(
                        name: "FK__Order__UserUID__66603565",
                        column: x => x.UserUID,
                        principalTable: "User",
                        principalColumn: "UID");
                });

            migrationBuilder.CreateTable(
                name: "OrderItem",
                columns: table => new
                {
                    OrderItemUID = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    OrderUID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductUID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__OrderIte__7A70AEA3A156B1BD", x => x.OrderItemUID);
                    table.ForeignKey(
                        name: "FK_OrderItem_Product_ProductUID",
                        column: x => x.ProductUID,
                        principalTable: "Product",
                        principalColumn: "ProductUID");
                    table.ForeignKey(
                        name: "FK__OrderItem__Order__6A30C649",
                        column: x => x.OrderUID,
                        principalTable: "Order",
                        principalColumn: "OrderUID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Logging_UserUID",
                table: "Logging",
                column: "UserUID");

            migrationBuilder.CreateIndex(
                name: "IX_Order_ShopUID",
                table: "Order",
                column: "ShopUID");

            migrationBuilder.CreateIndex(
                name: "IX_Order_UserUID",
                table: "Order",
                column: "UserUID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_OrderUID",
                table: "OrderItem",
                column: "OrderUID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_ProductUID",
                table: "OrderItem",
                column: "ProductUID");

            migrationBuilder.CreateIndex(
                name: "IX_Product_Category",
                table: "Product",
                column: "Category");

            migrationBuilder.CreateIndex(
                name: "IX_Product_ShopUID",
                table: "Product",
                column: "ShopUID");

            migrationBuilder.CreateIndex(
                name: "IX_User_ShopUID",
                table: "User",
                column: "ShopUID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BankTransaction");

            migrationBuilder.DropTable(
                name: "Logging");

            migrationBuilder.DropTable(
                name: "OrderItem");

            migrationBuilder.DropTable(
                name: "Table");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Shop");
        }
    }
}
