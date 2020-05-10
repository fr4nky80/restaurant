using Microsoft.EntityFrameworkCore;
using Restaurant.Api.Infrastructure.Models;

namespace Restaurant.Api.Infrastructure.Data
{
    public class RestaurantContext : DbContext
    {
        public RestaurantContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<RestaurantConfig> RestaurantConfigs { get; set; }
    }
}
