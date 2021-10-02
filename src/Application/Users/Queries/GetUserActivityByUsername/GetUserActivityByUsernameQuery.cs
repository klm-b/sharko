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

namespace Sharko.Application.Users.Queries.GetUserActivityByUsername
{
    public record GetUserActivityByUsernameQuery(string Username) : IRequest<UserActivityDto>;

    public class GetUserActivityByUsernameQueryHandler : IRequestHandler<GetUserActivityByUsernameQuery, UserActivityDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IIdentityService _identityService;
        private readonly IMapper _mapper;

        public GetUserActivityByUsernameQueryHandler(IApplicationDbContext context, IIdentityService identityService, IMapper mapper)
        {
            _context = context;
            _identityService = identityService;
            _mapper = mapper;
        }

        public async Task<UserActivityDto> Handle(GetUserActivityByUsernameQuery request, CancellationToken cancellationToken)
        {
            var user = await _identityService.GetUserByNameAsync(request.Username);
            if (user == null) return null;

            int followersNum = _context.Subscriptions.Count(s => s.FollowingId == user.Id);
            int summariesNum = _context.Summaries.Count(p => p.Creator == user);
            int commentsNum = _context.Comments.Count(p => p.Author == user);

            // создание объекта для ответа клиенту
            var userActivityDto = new UserActivityDto
            {
                CommentsNum = commentsNum,
                FollowersNum = followersNum,
                SummariesNum = summariesNum,
                Rating = user.Rating
            };

            return userActivityDto;
        }
    }
}
