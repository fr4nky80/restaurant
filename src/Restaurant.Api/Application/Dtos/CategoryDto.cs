using System;

namespace Restaurant.Api.Application.Dtos
{
    public class CategoryDto
    {
        public Guid CategoryId { get; set; }
        public string Name { get; set; }
        public string SubTitle { get; set; }
        public string Description { get; set; }

    }
}
