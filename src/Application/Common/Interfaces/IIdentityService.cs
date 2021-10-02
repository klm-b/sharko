using Sharko.Application.Common.Models;
using Sharko.Domain.Entities;
using System.Threading.Tasks;

namespace Sharko.Application.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<string> GetUserNameAsync(string userId);

        Task<Person> GetUserByNameAsync(string username);

        Task<bool> IsInRoleAsync(string userId, string role);

        Task<bool> IsUsernameAvailable(string username);

        Task<bool> AuthorizeAsync(string userId, string policyName);

        Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password);

        Task<Result> DeleteUserAsync(string userId);

        Task<Result> UpdateUserAsync(string userId, string userName, string status, string bio);
    }
}
