using System;

namespace Restaurant.Api.Infrastructure.Models
{
    public class RestaurantConfig
    {
        public RestaurantConfig()
        {
            RestaurantConfigId = Guid.NewGuid();
        }

        public Guid RestaurantConfigId { get; set; }
        public string PrimaryColor { get; set; }
        public string RestaurantName { get; set; }
        public string Logo { get; set; }
        public string FontFamily { get; set; }
        public bool IsDefault { get; set; }
    }
}
