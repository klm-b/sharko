using Sharko.Application.Common.Mappings;
using Sharko.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sharko.Application.Summaries.Queries.GetSummary
{
    public class ChapterDto : IMapFrom<Chapter>
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public string Title { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
