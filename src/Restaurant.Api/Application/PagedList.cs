using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Restaurant.Api.Application
{
	public class PagedList<T> 
	{
		public int CurrentPage { get; set; }
		public int TotalPages { get; set; }
		public int PageSize { get; set; }
		public int TotalCount { get; set; }

		public bool HasPrevious => CurrentPage > 1;
		public bool HasNext => CurrentPage < TotalPages;

		public IEnumerable<T> Data { get; set; }

		public PagedList(List<T> items, int count, int pageNumber, int pageSize)
		{
			TotalCount = count;
			PageSize = pageSize;
			CurrentPage = pageNumber;
			TotalPages = (int)Math.Ceiling(count / (double)pageSize);
			Data = items;
		}

	
	}
	public static class PagedListExtension
	{

		public static PagedList<Dto> ToPagedList<T, Dto>(this IQueryable<T> source, int pageNumber, int pageSize, IMapper mapper)
		{
			var count = source.Count();
			var items = source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

			var result = mapper.Map<List<Dto>>(items);

			return new PagedList<Dto>(result, count, pageNumber, pageSize);
		}
	}
}
