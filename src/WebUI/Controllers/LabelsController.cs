using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sharko.Application.Books.Queries.GetBookInfo;
using Sharko.Application.Books.Queries.GetBooksByTitle;
using Sharko.Application.Common.Models;
using Sharko.Application.Labels.Queries.GetLabels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sharko.WebUI.Controllers
{

    [Authorize]
    public class LabelsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<LabelDto>>> GetLabels()
        {
            return await Mediator.Send(new GetLabelsQuery());
        }
    }
}
