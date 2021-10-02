using Microsoft.AspNetCore.Mvc;
using Sharko.Application.Common.Interfaces;
using Sharko.Application.Users.Queries.CheckUsernameAvailability;
using Sharko.Application.Users.Queries.GetUserActivityByUsername;
using Sharko.Application.Users.Queries.GetUserByUsername;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
namespace Sharko.WebUI.Controllers
{
    public class UsersController : ApiControllerBase
    {
        private readonly IIdentityService _identityService;

        public UsersController(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<UserDto>> GetUserByUsername(string username)
        {
            var user = await Mediator.Send(new GetUserByUsernameQuery(username));

            if (user == null) return NotFound();

            return user;
        }

        [HttpGet("{username}/activity")]
        public async Task<ActionResult<UserActivityDto>> GetUserActivity(string username)
        {
            return await Mediator.Send(new GetUserActivityByUsernameQuery(username));
        }

        [HttpGet("availability/{username}")]
        public async Task<ActionResult<bool>> CheckAvailability(string username)
        {
            return await Mediator.Send(new CheckUsernameAvailabilityQuery(username));
        }
    }
}
