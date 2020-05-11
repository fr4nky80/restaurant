using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Restaurant.Api.Application.Dtos;
using Restaurant.Api.Application.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Restaurant.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuAppService _menuAppService;

        public MenuController(IMenuAppService menuAppService)
        {
            _menuAppService = menuAppService ?? throw new ArgumentNullException(nameof(menuAppService));
        }

        [HttpGet("category/{categoryId}/details")]
        public async Task<ActionResult<CategoryDetailDto>> GetCategoryDetail(Guid categoryId, [FromQuery] PaginationDto paginationParameters)
        {
            var result = await _menuAppService.GetCategoryDetailsAsync(categoryId, paginationParameters);

            var metadata = new
            {
                result.Products.TotalCount,
                result.Products.PageSize,
                result.Products.CurrentPage,
                result.Products.TotalPages,
                result.Products.HasNext,
                result.Products.HasPrevious
            };

            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

            return Ok(result);
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories([FromQuery] PaginationDto paginationParameters)
        {

            var result = await _menuAppService.GetCategoriesAsync(paginationParameters);
            var metadata = new
            {
                result.TotalCount,
                result.PageSize,
                result.CurrentPage,
                result.TotalPages,
                result.HasNext,
                result.HasPrevious
            };

            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

            return Ok(result);
        }

        [HttpPost("category"),
         HttpPut("category")]
        public async Task<ActionResult<CategoryDto>> UpsertCategory([FromBody] CategoryDto category)
        {
            var result = await _menuAppService.UpsertCategoryAsync(category);

            return Ok(result);
        }

        [HttpDelete("category/{categoryId}")]
        public async Task<IActionResult> DeleteCategory(Guid categoryId)
        {
            await _menuAppService.DeleteCategoryAsync(categoryId);
            return Ok();
        }


        [HttpDelete("product/{productId}")]
        public async Task<IActionResult> DeleteProduct(Guid productId)
        {
            await _menuAppService.DeleteProductAsync(productId);
            return Ok();
        }


        [HttpPost("product"),
         HttpPut("product")]
        public async Task<IActionResult> UpsertProduct([FromBody] ProductDto product)
        {
            var result = await _menuAppService.UpsertProductAsync(product);

            return Ok(result);
        }

    }
}