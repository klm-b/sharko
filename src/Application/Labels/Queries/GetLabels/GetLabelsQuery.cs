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
namespace Sharko.Application.Labels.Queries.GetLabels
{
    public record GetLabelsQuery() : IRequest<List<LabelDto>>;

    public class GetLabelsQueryHandler : IRequestHandler<GetLabelsQuery, List<LabelDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetLabelsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<LabelDto>> Handle(GetLabelsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Labels
                .ProjectTo<LabelDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}
