using Sharko.Application.Common.Exceptions;
using Sharko.Application.Common.Interfaces;
using Sharko.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Sharko.Application.UserProfile.Commands.UpdateProfile
{
    public class UpdateProfileCommand : IRequest
    {
        public string UserName { get; set; }
        public string Status { get; set; }
        public string Bio { get; set; }
    }

    public class UpdateProfileCommandHandler : IRequestHandler<UpdateProfileCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IIdentityService _identityService;

        public UpdateProfileCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IIdentityService identityService)
        {
            _context = context;
            _currentUserService = currentUserService;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
        {
            await _identityService.UpdateUserAsync(_currentUserService.UserId, request.UserName, request.Status, request.Bio);

            return Unit.Value;
        }
    }
}
