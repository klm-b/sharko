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

namespace Sharko.Application.Summaries.Queries.GetSummary
{
    public record GetSummaryQuery(int Id) : IRequest<SummaryDto>;

    public class GetSummaryQueryHandler : IRequestHandler<GetSummaryQuery, SummaryDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetSummaryQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<SummaryDto> Handle(GetSummaryQuery request, CancellationToken cancellationToken)
        {
            var summary = await _context.Summaries
                .Include(s => s.Creator)
                .Include(s => s.Book)
                .Where(c => c.Id == request.Id)
                .ProjectTo<SummaryDto>(_mapper.ConfigurationProvider)
                .FirstAsync(cancellationToken);

            summary.Labels = await _context.SummaryLabels
                    .Include(sl => sl.Label)
                    .Where(sl => sl.SummaryId == summary.Id)
                    .Select(sl => sl.Label)
                    .ProjectTo<LabelDto>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);

            summary.Chapters = await _context.Chapters
                    .Where(c => c.SummaryId == summary.Id)
                    .ProjectTo<ChapterDto>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);

            return summary;
        }
    }
}
