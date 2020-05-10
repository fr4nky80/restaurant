using Restaurant.Api.Application.Dtos;
using System.Threading.Tasks;

namespace Restaurant.Api.Application.Services
{
    public interface IRestaurantAppService
    {
        Task<RestaurantConfigDto> GetDefaultConfigAsync();
        Task<RestaurantConfigDto> UpsertRestaurantConfigAsync(RestaurantConfigDto config);
    }
}