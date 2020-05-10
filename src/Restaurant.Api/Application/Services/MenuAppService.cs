using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Restaurant.Api.Application.Dtos;
using Restaurant.Api.Infrastructure.Data;
using Restaurant.Api.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Restaurant.Api.Application.Services
{
    public class MenuAppService : IMenuAppService
    {
        private readonly RestaurantContext _context;
        private readonly IMapper _mapper;

        public MenuAppService(RestaurantContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        private async Task InsertCategoryAsync(CategoryDto category)
        {
            var categoryDomain = _mapper.Map<Category>(category);

            await _context.AddAsync(categoryDomain);
        }

        private Task UpdateCategoryAsync(CategoryDto category, Category categoryDomain)
        {
            _mapper.Map<CategoryDto, Category>(category, categoryDomain);

            _context.Update(categoryDomain);

            return Task.CompletedTask;
        }

        private Task UpdateProductAsync(ProductDto product, Product productDomain)
        {
            _mapper.Map<ProductDto, Product>(product, productDomain);

            _context.Update(productDomain);

            return Task.CompletedTask;
        }

        private async Task InsertProductAsync(ProductDto product)
        {
            var productDomain = _mapper.Map<Product>(product);

            await _context.AddAsync(productDomain);
        }

        public async Task<CategoryDto> UpsertCategoryAsync(CategoryDto category)
        {
            var categoryDomain = _context.Categories.FirstOrDefault(p => p.CategoryId == category.CategoryId);

            if (categoryDomain == null)
            {
                await InsertCategoryAsync(category);
            }
            else await UpdateCategoryAsync(category, categoryDomain);

            await _context.SaveChangesAsync();

            return category;
        }

        public async Task<ProductDto> UpsertProductAsync(ProductDto product)
        {
            var productDomain = _context.Products.FirstOrDefault(p => p.ProductId == product.ProductId);

            if (productDomain == null)
            {
                await InsertProductAsync(product);
            }
            else await UpdateProductAsync(product, productDomain);

            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<bool> DeleteProductAsync(Guid productId)
        {
            try
            {
                var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == productId);
                if (product == null) return true;
                _context.Remove(product);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteCategoryAsync(Guid categoryId)
        {
            try
            {
                var category = await _context.Categories.FirstOrDefaultAsync(p => p.CategoryId == categoryId);
                if (category == null) return true;
                _context.Remove(category);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<CategoryDto>> GetCategoryAsync()
        {
            var result = await _context.Categories.ToListAsync();

            return _mapper.Map<IEnumerable<CategoryDto>>(result);
        }

        public async Task<CategoryDetailDto> GetCategoryDetailsAsync(Guid categoryId, PaginationDto paginationParameters)
        {

            var products = PagedList<Product>
                .ToPagedList<Product, ProductDto>(_context.Products.OrderBy(on => on.Title),
                                                  paginationParameters.PageNumber,
                                                  paginationParameters.PageSize,
                                                  _mapper);

            var category = await _context.Categories.FirstOrDefaultAsync(p => p.CategoryId == categoryId);


            var categoryResult = _mapper.Map<CategoryDetailDto>(category);

            categoryResult.Products = products;

            return categoryResult;
        }
    }
}
