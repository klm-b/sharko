using Sharko.Application.Common.Interfaces;
using Sharko.Infrastructure.Identity;
using Sharko.Infrastructure.Persistence;
using Sharko.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using IdentityServer4.EntityFramework.Stores;
using IdentityServer4.EntityFramework.Services;
using IdentityServer4.Stores;
using IdentityServer4.Services;
using System.IO;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;

namespace Sharko.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            if (configuration.GetValue<bool>("UseInMemoryDatabase"))
            {
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseInMemoryDatabase("SharkoDb"));
            }
            else
            {
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(
                        configuration.GetConnectionString("DefaultConnection"),
                        b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
            }

            services.AddScoped<IFileClient, LocalFileClient>(client => {
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), "Resources");
                
                return new LocalFileClient(pathToSave);
            });

            services.AddScoped<IApplicationDbContext>(provider => provider.GetService<ApplicationDbContext>());
            services.AddScoped<IDomainEventService, DomainEventService>();
            services.AddScoped<IUserClaimsPrincipalFactory<ApplicationUser>, CustomUserClaimsPrincipalFactory>();

            services
                // .AddDefaultIdentity<ApplicationUser>()
                // .AddRoles<IdentityRole>()
                .AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

           
            services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, ApplicationDbContext>(config => {
                    var client = config.Clients[0];
                    client.AllowOfflineAccess = true;
                    client.RedirectUris.Add("/silent-renew.html");

                    config.IdentityResources["openid"].UserClaims.Add("role");
                    config.ApiResources.Single().UserClaims.Add("role");
                });

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Remove("role");

            services.AddTransient<IDateTime, DateTimeService>();
            services.AddTransient<IIdentityService, IdentityService>();

            services.AddAuthentication()
                .AddIdentityServerJwt();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("CanPurge", policy => policy.RequireRole("Administrator"));
            });

            return services;
        }
    }
}