using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BEERAPI.Migrations
{
    /// <inheritdoc />
    public partial class addPaymentDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "payment_date",
                table: "order",
                type: "timestamp without time zone",
                nullable: true,
                defaultValueSql: "now()");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "payment_date",
                table: "order");
        }
    }
}
