using Sharko.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sharko.Domain.Entities
{
    public class ISBN : BaseEntity
    {
        public string Value { get; set; }

        public Book Book { get; set; }
        public int BookId { get; set; }
    }
}
