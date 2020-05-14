using Microsoft.AspNetCore.Mvc;
using Restaurant.Api.Application.Dtos;
using Restaurant.Api.Application.Services;
using System.Threading.Tasks;

namespace Restaurant.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        private readonly IRestaurantAppService _restaurantAppService;

        public RestaurantController(IRestaurantAppService restaurantAppService)
        {
            _restaurantAppService = restaurantAppService ?? throw new System.ArgumentNullException(nameof(restaurantAppService));
        }

        [HttpGet]
        public async Task<IActionResult> GetConfigs([FromQuery] PaginationDto paginationParameters)
        {
            return Ok(await _restaurantAppService.GetConfigsAsync(paginationParameters));
        }

        [HttpGet("default")]
        public async Task<IActionResult> GetDefaultConfig()
        {
            return Ok(await _restaurantAppService.GetDefaultConfigAsync());
        }

        [HttpPost,HttpPut]
        public async Task<IActionResult> UpsertConfig([FromBody] RestaurantConfigDto config)
        {
            return Ok(await _restaurantAppService.UpsertRestaurantConfigAsync(config));
        }
    }
}