using System;

namespace Restaurant.Api.Infrastructure.Models
{
    public class Product
    {
        //EF
        private Product() { }
        
        public Product(Guid categoryId)
        {
            CategoryId = categoryId;
            ProductId = Guid.NewGuid();
        }

        public Guid ProductId { get; set; }
        public Guid CategoryId { get; set; }
        public string Title { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; }
    }
}