using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Sharko.Application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Sharko.Infrastructure.Identity
{
    public class CustomUserClaimsPrincipalFactory : UserClaimsPrincipalFactory<ApplicationUser, IdentityRole>
    {
        private IApplicationDbContext _applicationDbContext;

        public CustomUserClaimsPrincipalFactory(
        IApplicationDbContext applicationDbContext,
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> roleManager,
        IOptions<IdentityOptions> optionsAccessor)
        : base(userManager, roleManager, optionsAccessor)
        {
            _applicationDbContext = applicationDbContext;
        }

        public override async Task<ClaimsPrincipal> CreateAsync(ApplicationUser user)
        {
            var principal = await base.CreateAsync(user);
            var identity = principal.Identities.First();

            var roles = await UserManager.GetRolesAsync(user);

            var picture = _applicationDbContext.Persons
                .Where(p => p.ApplicationUserId == user.Id).FirstOrDefault()?.Picture;

            identity.AddClaims(new[] {
            new Claim("picture", string.IsNullOrEmpty(picture) ? "avatars/noavatar.png" : Path.Join("resources", "avatars", picture)),
            // new Claim("roles", string.Join(" ", roles))
        });

            return principal;
        }
    }
}
