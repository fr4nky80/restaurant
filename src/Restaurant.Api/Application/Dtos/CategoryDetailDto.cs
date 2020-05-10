using System.Collections.Generic;

namespace Restaurant.Api.Application.Dtos
{
    public class CategoryDetailDto
    {
        public string Name { get; set; }

        public PagedList<ProductDto> Products { get; set; }
    }
}
