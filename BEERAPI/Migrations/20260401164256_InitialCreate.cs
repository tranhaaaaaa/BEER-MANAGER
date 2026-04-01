using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BEERAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "bank_transaction",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false),
                    gateway = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    transaction_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    account_number = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    sub_account = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    transfer_type = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    transfer_amount = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    content = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    reference_code = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    accumulated = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    raw_json = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<int>(type: "integer", nullable: true, defaultValue: 0),
                    order_id = table.Column<Guid>(type: "uuid", nullable: true),
                    extracted_order_code = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: true, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("banktransaction_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "category",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    type = table.Column<int>(type: "integer", nullable: false),
                    description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("category_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "shop",
                columns: table => new
                {
                    shop_uid = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    shop_name = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    username = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    password = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: true, defaultValueSql: "now()"),
                    img = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("shop_pkey", x => x.shop_uid);
                });

            migrationBuilder.CreateTable(
                name: "table_info",
                columns: table => new
                {
                    table_id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    order_id = table.Column<Guid>(type: "uuid", nullable: true),
                    status = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("table_pkey", x => x.table_id);
                });

            migrationBuilder.CreateTable(
                name: "product",
                columns: table => new
                {
                    product_uid = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    shop_uid = table.Column<Guid>(type: "uuid", nullable: false),
                    product_name = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    price = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    stock = table.Column<int>(type: "integer", nullable: true, defaultValue: 0),
                    type = table.Column<int>(type: "integer", nullable: true, defaultValue: 0),
                    created_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: true, defaultValueSql: "now()"),
                    price_config = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    img = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    category = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("product_pkey", x => x.product_uid);
                    table.ForeignKey(
                        name: "fk_product_category",
                        column: x => x.category,
                        principalTable: "category",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_product_shop_uid",
                        column: x => x.shop_uid,
                        principalTable: "shop",
                        principalColumn: "shop_uid");
                });

            migrationBuilder.CreateTable(
                name: "user_account",
                columns: table => new
                {
                    uid = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    phone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    address = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: true, defaultValueSql: "now()"),
                    shop_uid = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("user_pkey", x => x.uid);
                    table.ForeignKey(
                        name: "fk_user_shop_uid",
                        column: x => x.shop_uid,
                        principalTable: "shop",
                        principalColumn: "shop_uid");
                });

            migrationBuilder.CreateTable(
                name: "logging",
                columns: table => new
                {
                    log_uid = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    user_uid = table.Column<Guid>(type: "uuid", nullable: true),
                    action = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    table_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    level = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    record_uid = table.Column<Guid>(type: "uuid", nullable: true),
                    message = table.Column<string>(type: "text", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp without time zone", nullable: true, defaultValueSql: "now()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("logging_pkey", x => x.log_uid);
                    table.ForeignKey(
                        name: "fk_logging_user_uid",
                        column: x => x.user_uid,
                        principalTable: "user_account",
                        principalColumn: "uid");
                });

            migrationBuilder.CreateTable(
                name: "order",
                columns: table => new
                {
                    order_uid = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    user_uid = table.Column<Guid>(type: "uuid", nullable: true),
                    order_date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true, defaultValueSql: "now()"),
                    status = table.Column<int>(type: "integer", nullable: false),
                    total_amount = table.Column<decimal>(type: "numeric(18,2)", nullable: true, defaultValue: 0m),
                    payment_type = table.Column<int>(type: "integer", nullable: false),
                    shop_uid = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    type = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("order_pkey", x => x.order_uid);
                    table.ForeignKey(
                        name: "fk_order_shop_uid",
                        column: x => x.shop_uid,
                        principalTable: "shop",
                        principalColumn: "shop_uid");
                    table.ForeignKey(
                        name: "fk_order_user_uid",
                        column: x => x.user_uid,
                        principalTable: "user_account",
                        principalColumn: "uid");
                });

            migrationBuilder.CreateTable(
                name: "order_item",
                columns: table => new
                {
                    order_item_uid = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    order_uid = table.Column<Guid>(type: "uuid", nullable: false),
                    product_uid = table.Column<Guid>(type: "uuid", nullable: false),
                    quantity = table.Column<int>(type: "integer", nullable: false),
                    unit_price = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("order_item_pkey", x => x.order_item_uid);
                    table.ForeignKey(
                        name: "fk_order_item_order_uid",
                        column: x => x.order_uid,
                        principalTable: "order",
                        principalColumn: "order_uid");
                    table.ForeignKey(
                        name: "fk_order_item_product_uid",
                        column: x => x.product_uid,
                        principalTable: "product",
                        principalColumn: "product_uid");
                });

            migrationBuilder.CreateIndex(
                name: "IX_logging_user_uid",
                table: "logging",
                column: "user_uid");

            migrationBuilder.CreateIndex(
                name: "IX_order_shop_uid",
                table: "order",
                column: "shop_uid");

            migrationBuilder.CreateIndex(
                name: "IX_order_user_uid",
                table: "order",
                column: "user_uid");

            migrationBuilder.CreateIndex(
                name: "IX_order_item_order_uid",
                table: "order_item",
                column: "order_uid");

            migrationBuilder.CreateIndex(
                name: "IX_order_item_product_uid",
                table: "order_item",
                column: "product_uid");

            migrationBuilder.CreateIndex(
                name: "IX_product_category",
                table: "product",
                column: "category");

            migrationBuilder.CreateIndex(
                name: "IX_product_shop_uid",
                table: "product",
                column: "shop_uid");

            migrationBuilder.CreateIndex(
                name: "IX_user_account_shop_uid",
                table: "user_account",
                column: "shop_uid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "bank_transaction");

            migrationBuilder.DropTable(
                name: "logging");

            migrationBuilder.DropTable(
                name: "order_item");

            migrationBuilder.DropTable(
                name: "table_info");

            migrationBuilder.DropTable(
                name: "order");

            migrationBuilder.DropTable(
                name: "product");

            migrationBuilder.DropTable(
                name: "user_account");

            migrationBuilder.DropTable(
                name: "category");

            migrationBuilder.DropTable(
                name: "shop");
        }
    }
}
