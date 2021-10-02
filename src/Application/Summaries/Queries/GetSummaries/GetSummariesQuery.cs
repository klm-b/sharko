using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Sharko.Application.Common.Interfaces;
using Sharko.Application.Common.Mappings;
using Sharko.Application.Common.Models;
using Sharko.Application.Summaries.Queries.GetSummary;
using Sharko.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Sharko.Application.Summaries.Queries.GetSummaries
{
    public record GetSummariesQuery(string UserName = null, string SortBy = "createdAt", string SortOrder = "desc", int PageNumber = 1, int PageSize = 10) : IRequest<PaginatedList<SummaryInfoDto>>;

    public class GetSummariesQueryHandler : IRequestHandler<GetSummariesQuery, PaginatedList<SummaryInfoDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetSummariesQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PaginatedList<SummaryInfoDto>> Handle(GetSummariesQuery request, CancellationToken cancellationToken)
        {

            IQueryable<Summary> summaries = _context.Summaries
            .Include(s => s.Creator);

            if (request.UserName != null)
                summaries = summaries.Where(s => s.Creator.UserName == request.UserName);

            bool sortedByDesc = request.SortOrder == "desc";

            summaries = request.SortBy switch
            {
                "rating" => sortedByDesc ? summaries.OrderByDescending(o => o.Rating) : summaries.OrderBy(o => o.Rating),
                _ => sortedByDesc ? summaries.OrderByDescending(o => o.CreatedAt) : summaries.OrderBy(o => o.CreatedAt),
            };

            var response = await summaries
            .ProjectTo<SummaryInfoDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);

            response.Items = response.Items.Select(s =>
            {
                s.Labels = _context.SummaryLabels
                    .Include(sl => sl.Label)
                    .Where(sl => sl.SummaryId == s.Id)
                    .Select(sl => sl.Label)
                    .ProjectTo<LabelDto>(_mapper.ConfigurationProvider)
                    .ToList();

                s.ChaptersNumber = _context.Chapters.Where(c => c.SummaryId == s.Id).Count();
                return s;
            }).ToList();

            return response;
        }
    }
}
