using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sharko.Application.Chapters.Queries.GetAllChapters;
using Sharko.Application.Chapters.Queries.GetChapter;
using Sharko.Application.Summaries.Queries.GetChapter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sharko.WebUI.Controllers
{
    [Authorize]
    public class ChaptersController : ApiControllerBase
    {
        [HttpGet("{summaryId}")]
        public async Task<ActionResult<List<ChapterDto>>> Get(int summaryId)
        {
            return await Mediator.Send(new GetAllChaptersQuery(summaryId));
        }

        [HttpGet("{summaryId}/{number}")]
        public async Task<ActionResult<ChapterContentDto>> Get(int summaryId, int number)
        {
            return await Mediator.Send(new GetChapterQuery(summaryId, number));
        }
    }
}
