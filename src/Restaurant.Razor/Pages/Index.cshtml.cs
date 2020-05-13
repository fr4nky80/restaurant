using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Restaurant.Razor.Dtos;
using Restaurant.Razor.Services;

namespace Restaurant.Razor.Pages
{
    public class IndexModel : PageModel
    {
        private readonly IRestaurantApi _restaurantApi;
        public IEnumerable<CategoryDto> Categories { get; private set; }
        public IndexModel(IRestaurantApi restaurantApi)
        {
            _restaurantApi = restaurantApi ?? throw new ArgumentNullException(nameof(restaurantApi));
        }
        public async Task OnGet()
        {
            Categories = await _restaurantApi.GetCategoriesAsync(new PaginationDto()
            {
                PageNumber = 1,
                PageSize = 50
            });
        }
    }
}
