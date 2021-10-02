using AutoMapper;
using MediatR;
using Sharko.Application.Common.Interfaces;
using Sharko.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Sharko.Application.Summaries.Commands.CreateSummary
{
    public record CreateSummaryCommand(int BookId, string About, List<int> Labels) : IRequest<int>;

    public class CreateSummaryCommandHandler : IRequestHandler<CreateSummaryCommand, int>
    {
        private readonly IApplicationDbContext _context;

        private readonly ICurrentUserService _currentUserService;

        public CreateSummaryCommandHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<int> Handle(CreateSummaryCommand request, CancellationToken cancellationToken)
        {
            var newSummary = new Summary
            {
                BookId = request.BookId,
                About = request.About,
                Labels = _context.Labels.Where(l => request.Labels.Contains(l.Id)).ToList(),
                IsPublic = true,
                CreatorId = _context.Persons.Where(p => p.ApplicationUserId == _currentUserService.UserId).Select(p => p.Id).First()
            };

            _context.Summaries.Add(newSummary);

            await _context.SaveChangesAsync(cancellationToken);

            return newSummary.Id;
        }
    }
}
