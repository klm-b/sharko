using Application.Books.Queries.GetBooks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sharko.Application.Books.Queries.GetBookInfo;
using Sharko.Application.Books.Queries.GetBooksByTitle;
using Sharko.Application.Common.Models;
using System.Threading.Tasks;

namespace Sharko.WebUI.Controllers
{
    [Authorize]
    public class BooksController : ApiControllerBase
    {
        [HttpGet("category/{category}")]
        public async Task<ActionResult<PaginatedList<BookDto>>> GetBooksWithPagination(string category, [FromQuery] int PageNumber, [FromQuery] int PageSize)
        {
            return await Mediator.Send(new GetBooksQuery(category, PageNumber, PageSize));
        }

        [HttpGet]
        public async Task<ActionResult<PaginatedList<BookDto>>> GetBooksByTitle([FromQuery] GetBooksByTitleQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookInfoDto>> GetBookById(int id)
        {
            return await Mediator.Send(new GetBookInfoQuery(id));
        }
    }
}
