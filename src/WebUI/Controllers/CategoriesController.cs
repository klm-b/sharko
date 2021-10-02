using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sharko.Application.Categories.Queries.GetCategories;
using Sharko.Application.Categories.Queries.GetCategoriesWithTags;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sharko.WebUI.Controllers
{
    [Authorize]
    public class CategoriesController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<CategoryDto>>> GetCategories()
        {
            return await Mediator.Send(new GetCategoriesQuery());
        }

        [HttpGet("tags")]
        public async Task<ActionResult<CategoriesWithTagsVm>> GetCategoriesWithTags()
        {
            return await Mediator.Send(new GetCategoriesWithTagsQuery());
        }
    }
}
