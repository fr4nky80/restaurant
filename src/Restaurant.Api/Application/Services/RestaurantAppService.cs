using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Restaurant.Api.Application.Dtos;
using Restaurant.Api.Infrastructure.Data;
using Restaurant.Api.Infrastructure.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Restaurant.Api.Application.Services
{
    public class RestaurantAppService : IRestaurantAppService
    {
        private readonly RestaurantContext _context;
        private readonly IMapper _mapper;

        public RestaurantAppService(RestaurantContext context, IMapper mapper)
        {
            _context = context ?? throw new System.ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<RestaurantConfigDto> GetDefaultConfigAsync()
        {
            var result = await _context.RestaurantConfigs.FirstOrDefaultAsync(p => p.IsDefault == true);

            return _mapper.Map<RestaurantConfigDto>(result);
        }


        public async Task<RestaurantConfigDto> UpsertRestaurantConfigAsync(RestaurantConfigDto config)
        {
            var result = await _context.RestaurantConfigs.FirstOrDefaultAsync(p => p.RestaurantConfigId == config.RestaurantConfigId);

            if (result == null)
            {
                await InsertConfigAsync(config);
            }
            else
            {
                await UpdateConfigAsync(config, result);
            }
            await _context.SaveChangesAsync();
            return config;
        }

        private async Task UpdateConfigAsync(RestaurantConfigDto config, RestaurantConfig result)
        {
            if (config.IsDefault)
            {
                var all = await _context.RestaurantConfigs.ToListAsync();
                all.ForEach(item => item.IsDefault = false);
                _context.RestaurantConfigs.UpdateRange(all);
            }

            var data = _mapper.Map(config, result);
            _context.RestaurantConfigs.Update(data);
        }

        private async Task InsertConfigAsync(RestaurantConfigDto config)
        {
            var isDefault = !await _context.RestaurantConfigs.AnyAsync();

            var result = _mapper.Map<RestaurantConfig>(config);

            result.IsDefault = isDefault;

            await _context.RestaurantConfigs.AddAsync(result);
        }

        public Task<PagedList<RestaurantConfigDto>> GetConfigsAsync(PaginationDto paginationParameters)
        {
            IQueryable<RestaurantConfig> query = _context.RestaurantConfigs.OrderBy(on => on.RestaurantName);
            if (!string.IsNullOrEmpty(paginationParameters.SearchPattern))
            {
                query = query.Where(p =>
                p.RestaurantName.ToUpper().Contains(paginationParameters.SearchPattern.ToUpper()));
            }
            var result = query.ToPagedList<RestaurantConfig, RestaurantConfigDto>(paginationParameters.PageNumber,
                                                                                paginationParameters.PageSize,
                                                                                _mapper);

            return Task.FromResult(result);
        }
    }
}
