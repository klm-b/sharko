using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Books.Queries.GetBooks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Sharko.Application.Common.Interfaces;
using Sharko.Application.Common.Mappings;
using Sharko.Application.Common.Models;
using Sharko.Domain.Entities;

namespace Sharko.Application.Books.Queries.GetBooksByTitle
{

    public record GetBooksByTitleQuery(string Title, int PageNumber = 1, int PageSize = 5) : IRequest<PaginatedList<BookDto>>;

    public class GetBooksByTitleQueryHandler : IRequestHandler<GetBooksByTitleQuery, PaginatedList<BookDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetBooksByTitleQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PaginatedList<BookDto>> Handle(GetBooksByTitleQuery request, CancellationToken cancellationToken)
        {

            IQueryable<Book> query = _context.Books
                .Where(b => EF.Functions.Like(b.Name, $"%{request.Title}%"))
                .Include(c => c.Tags)
                .Include(c => c.ISBNs)
                .Include(c => c.Authors)
                .AsNoTracking();



            return await query
                .OrderBy(c => c.CreatedAt)
                .ProjectTo<BookDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.PageNumber, request.PageSize);

        }
    }
}
