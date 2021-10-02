using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sharko.Application.Common.Models;
using Sharko.Application.Summaries.Commands.CreateSummary;
using Sharko.Application.Summaries.Queries.GetSummaries;
using Sharko.Application.Summaries.Queries.GetSummary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sharko.WebUI.Controllers
{
    [Authorize]
    public class SummariesController : ApiControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<PaginatedList<SummaryInfoDto>>> GetAll([FromQuery] GetSummariesQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SummaryDto>> Get(int id)
        {
            return await Mediator.Send(new GetSummaryQuery(id));
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateSummaryCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}
