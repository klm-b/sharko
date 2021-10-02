using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Sharko.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Sharko.Application.Categories.Queries.GetCategoriesWithTags
{
    public record GetCategoriesWithTagsQuery(bool? WithTags = false) : IRequest<CategoriesWithTagsVm>;
    public class GetCategoriesWithTagsQueryHandler : IRequestHandler<GetCategoriesWithTagsQuery, CategoriesWithTagsVm>
    {
        private readonly IApplicationDbContext _context;

        private readonly IMapper _mapper;

        public GetCategoriesWithTagsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CategoriesWithTagsVm> Handle(GetCategoriesWithTagsQuery request, CancellationToken cancellationToken)
        {
            return new CategoriesWithTagsVm
            {
                Categories = await _context.Categories
                    .ProjectTo<CategoryWithTagsDto>(_mapper.ConfigurationProvider).ToListAsync()
            };
        }
    }
}
