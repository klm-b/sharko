using Application.Books.Queries.GetBooks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sharko.Application.Authors.Queries.GetAuthor;
using Sharko.Application.Books.Queries.GetBookInfo;
using Sharko.Application.Common.Models;
using System.Threading.Tasks;

namespace Sharko.WebUI.Controllers
{

    [Authorize]
    public class AuthorsController : ApiControllerBase
    {

        [HttpGet("{id}")]
        public async Task<ActionResult<Application.Authors.Queries.GetAuthor.AuthorDto>> GetBookById(int id)
        {
            return await Mediator.Send(new GetAuthorQuery(id));
        }
    }
}
