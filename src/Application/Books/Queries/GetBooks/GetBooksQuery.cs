using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Sharko.Application.Common.Interfaces;
using Sharko.Application.Common.Mappings;
using Sharko.Application.Common.Models;
using Sharko.Domain.Entities;

namespace Application.Books.Queries.GetBooks
{
    public record GetBooksQuery(string Category, int PageNumber = 1, int PageSize = 10) : IRequest<PaginatedList<BookDto>>;

    public class GetBooksQueryHandler : IRequestHandler<GetBooksQuery, PaginatedList<BookDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetBooksQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PaginatedList<BookDto>> Handle(GetBooksQuery request, CancellationToken cancellationToken)
        {

            IQueryable<Book> query = _context.Books
                .Include(c => c.Tags)
                // .Include(c => c.ISBNs)
                .Include(c => c.Categories)
                .Include(c => c.Authors)
                .AsNoTracking();

            if (!(string.IsNullOrEmpty(request.Category) || request.Category == "all"))
            {
                query = query.Where(b => b.Categories.Any(c => c.Key == request.Category));
            }

            return await query
                .OrderBy(c => c.CreatedAt)
                .ProjectTo<BookDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.PageNumber, request.PageSize);

        }
    }
}