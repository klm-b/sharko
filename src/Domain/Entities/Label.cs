using Sharko.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sharko.Domain.Entities
{
    public class Label : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Summary> Summaries { get; set; }
        public List<SummaryLabel> SummaryLabels { get; set; }
    }
}
