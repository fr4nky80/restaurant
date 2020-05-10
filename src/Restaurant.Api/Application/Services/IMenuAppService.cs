using Microsoft.AspNetCore.Mvc;
using Restaurant.Api.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Restaurant.Api.Application.Services
{
    public interface IMenuAppService
    {
        Task<CategoryDto> UpsertCategoryAsync(CategoryDto category);
        Task<ProductDto> UpsertProductAsync(ProductDto product);
        Task<bool> DeleteProductAsync(Guid productId);
        Task<bool> DeleteCategoryAsync(Guid categoryId);
        Task<IEnumerable<CategoryDto>> GetCategoryAsync();
        Task<CategoryDetailDto> GetCategoryDetailsAsync(Guid categoryId, PaginationDto paginationParameters);
    }
}