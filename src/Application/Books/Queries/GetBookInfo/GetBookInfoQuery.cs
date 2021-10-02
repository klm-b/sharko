using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Sharko.Application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Sharko.Application.Books.Queries.GetBookInfo
{
    public record GetBookInfoQuery(int Id) : IRequest<BookInfoDto>;

    public class GetBookInfoQueryHandler : IRequestHandler<GetBookInfoQuery, BookInfoDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetBookInfoQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<BookInfoDto> Handle(GetBookInfoQuery request, CancellationToken cancellationToken)
        {

            var books = await _context.Books
                .Where(s => s.Id == request.Id)
                .Include(b => b.Summaries)
                    .ThenInclude(s => s.Labels)
                .Include(b => b.Summaries)
                    .ThenInclude(s => s.Creator)
                .Include(b => b.Authors)
                .Include(b => b.ISBNs)
                .Include(b => b.Categories)
                .Include(b => b.Tags)
                .AsSplitQuery()
                .FirstOrDefaultAsync(cancellationToken);

            var responce = _mapper.Map<BookInfoDto>(books);

            responce.Summaries = responce.Summaries.Select(s =>
            {
                s.ChaptersNumber = _context.Chapters.Where(c => c.SummaryId == s.Id).Count();
                return s;
            }).ToList();

            return responce;
        }
    }
}
