using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Sharko.Application.Common.Interfaces;
using Sharko.Application.Summaries.Queries.GetChapter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Sharko.Application.Chapters.Queries.GetAllChapters
{
    public record GetAllChaptersQuery(int SummaryId) : IRequest<List<ChapterDto>>;

    public class GetAllChaptersQueryHandler : IRequestHandler<GetAllChaptersQuery, List<ChapterDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetAllChaptersQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ChapterDto>> Handle(GetAllChaptersQuery request, CancellationToken cancellationToken)
        {

            return await _context.Chapters
                .Where(c => c.SummaryId == request.SummaryId)
                .OrderBy(c => c.Number)
                .ProjectTo<ChapterDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}
