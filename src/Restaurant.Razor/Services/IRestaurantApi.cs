using Refit;
using Restaurant.Razor.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Restaurant.Razor.Services
{
    public interface IRestaurantApi
    {
        [Get("/api/Menu/categories")]
        Task<IEnumerable<CategoryDto>> GetCategoriesAsync([Query] PaginationDto paginationParameters);
    }
}
