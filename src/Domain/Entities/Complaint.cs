using Sharko.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sharko.Domain.Entities
{
    public class Complaint : BaseEntity
    {
        public Person Сomplainant { get; set; }
        public Summary Summary { get; set; }
        public string Reason { get; set; }
    }
}
