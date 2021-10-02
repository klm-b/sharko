using Sharko.Application.Common.Mappings;
using Sharko.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sharko.Application.Summaries.Queries.GetSummary
{
    public class LabelDto : IMapFrom<Label>
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
