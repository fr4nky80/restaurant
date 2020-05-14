using Restaurant.Api.Application.Dtos;
using System.Threading.Tasks;

namespace Restaurant.Api.Application.Services
{
    public interface IRestaurantAppService
    {
        Task<PagedList<RestaurantConfigDto>> GetConfigsAsync(PaginationDto paginationParameters);
        Task<RestaurantConfigDto> GetDefaultConfigAsync();
        Task<RestaurantConfigDto> UpsertRestaurantConfigAsync(RestaurantConfigDto config);
    }
}