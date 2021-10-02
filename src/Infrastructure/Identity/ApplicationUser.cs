using Microsoft.AspNetCore.Identity;
using Sharko.Domain.Entities;

namespace Sharko.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public Person Person { get; set; }
    }
}
