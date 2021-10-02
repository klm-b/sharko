using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Sharko.Application.Common.Interfaces;
using Sharko.Application.Users.Queries.GetUserActivityByUsername;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Sharko.Application.Users.Queries.CheckUsernameAvailability
{
    public record CheckUsernameAvailabilityQuery(string Username) : IRequest<bool>;

    public class CheckUsernameAvailabilityQueryHandler : IRequestHandler<CheckUsernameAvailabilityQuery, bool>
    {
        private readonly IApplicationDbContext _context;
        private readonly IIdentityService _identityService;

        public CheckUsernameAvailabilityQueryHandler(IApplicationDbContext context, IIdentityService identityService, IMapper mapper)
        {
            _context = context;
            _identityService = identityService;
        }

        public async Task<bool> Handle(CheckUsernameAvailabilityQuery request, CancellationToken cancellationToken)
        {
            return await _identityService.IsUsernameAvailable(request.Username.Trim());
        }
    }
}
