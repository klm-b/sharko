using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sharko.Application.Common.Interfaces;
using Sharko.Application.UserProfile.Commands.UpdateProfile;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Sharko.WebUI.Controllers
{
    [Authorize]
    public class ProfileController : ApiControllerBase
    {
        ICurrentUserService _currentUserService;

        IFileClient _fileClient;

        IApplicationDbContext _applicationDbContext;

        public ProfileController(ICurrentUserService currentUserService, IFileClient fileClient,
            IApplicationDbContext applicationDbContext)
        {
            _currentUserService = currentUserService;
            _fileClient = fileClient;
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost("avatar")]
        public async Task<IActionResult> UpdateAvatar(IFormFile file)
        {
            var person = _applicationDbContext.Persons.Where(p => p.ApplicationUserId == _currentUserService.UserId).FirstOrDefault();

            if (person == null)
                throw new ArgumentException("Person not found");

            var fileName = Path.GetRandomFileName() + Path.GetExtension(file.FileName);
            var folderName = "avatars";

            using (var fileStream = file.OpenReadStream())
            {
                await _fileClient.SaveFile(folderName, fileName, fileStream);

                if (person.Picture != null)
                    await _fileClient.DeleteFile(folderName, person.Picture);
            }

            person.Picture = fileName;


            await _applicationDbContext.SaveChangesAsync();

            return Ok(new { Picture = Path.Combine("resources", folderName, fileName) });
        }

        [HttpPut("personal")]
        public async Task<IActionResult> UpdateProfile(UpdateProfileCommand command)
        {
            await Mediator.Send(command);

            return Ok();
        }
    }
}
