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

namespace Sharko.Application.Chapters.Queries.GetChapter
{
    public record GetChapterQuery(int SummaryId, int Number) : IRequest<ChapterContentDto>;

    public class GetChapterQueryHandler : IRequestHandler<GetChapterQuery, ChapterContentDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetChapterQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ChapterContentDto> Handle(GetChapterQuery request, CancellationToken cancellationToken)
        {
            return await _context.Chapters
                .Where(c => c.SummaryId == request.SummaryId && c.Number == request.Number)
                .ProjectTo<ChapterContentDto>(_mapper.ConfigurationProvider)
                .FirstAsync(cancellationToken);
        }
    }
}
