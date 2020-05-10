using System;

namespace Restaurant.Api.Application.Dtos
{
    public class ProductDto
    {
        public ProductDto()
        {

        }
        public Guid ProductId { get; set; }
        public Guid CategoryId { get; set; }
        public string Title { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; }
    }
}