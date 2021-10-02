using Sharko.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sharko.Domain.Entities
{
    public class Chapter : BaseEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int Number { get; set; }

        public Summary Summary { get; set; }
        public int SummaryId { get; set; }
    }
}
