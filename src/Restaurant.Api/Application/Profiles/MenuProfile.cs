using AutoMapper;
using Restaurant.Api.Application.Dtos;
using Restaurant.Api.Infrastructure.Models;

namespace Restaurant.Api.Application.Profiles
{
    public class MenuProfile : Profile
    {
        public MenuProfile()
        {
            CreateMap<CategoryDto, Category>().ReverseMap();
            CreateMap<Category, CategoryDetailDto>();
            CreateMap<ProductDto, Product>().ReverseMap();
            CreateMap<PagedList<Product>, PagedList<ProductDto>>();
            CreateMap<RestaurantConfig, RestaurantConfigDto>().ReverseMap();
        }
    }
}
