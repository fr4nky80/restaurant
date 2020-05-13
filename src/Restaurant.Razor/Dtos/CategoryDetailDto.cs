using System.Collections.Generic;

namespace Restaurant.Razor.Dtos
{
    public class CategoryDetailDto
    {
        public string Name { get; set; }

        public IEnumerable<ProductDto> Products { get; set; }
    }
}
