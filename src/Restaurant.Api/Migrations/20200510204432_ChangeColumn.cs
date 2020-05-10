using Microsoft.EntityFrameworkCore.Migrations;

namespace Restaurant.Api.Migrations
{
    public partial class ChangeColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsPredeterminate",
                table: "RestaurantConfigs",
                newName: "IsDefault");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsDefault",
                table: "RestaurantConfigs",
                newName: "IsPredeterminate");
        }
    }
}
