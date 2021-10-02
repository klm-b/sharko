using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sharko.Domain.Entities
{
    public class SummaryLabel
    {
        public int SummaryId { get; set; }
        public Summary Summary { get; set; }

        public int LabelId { get; set; }
        public Label Label { get; set; }
    }
}
