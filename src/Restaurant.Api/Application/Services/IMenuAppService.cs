using Restaurant.Api.Application.Dtos;
using System;
using System.Threading.Tasks;

namespace Restaurant.Api.Application.Services
{
    public interface IMenuAppService
    {
        Task<CategoryDto> UpsertCategoryAsync(CategoryDto category);
        Task<ProductDto> UpsertProductAsync(ProductDto product);
        Task<bool> DeleteProductAsync(Guid productId);
        Task<bool> DeleteCategoryAsync(Guid categoryId);
        Task<PagedList<CategoryDto>> GetCategoriesAsync(PaginationDto paginationParameters);
        Task<CategoryDetailDto> GetCategoryDetailsAsync(Guid categoryId, PaginationDto paginationParameters);
    }
}