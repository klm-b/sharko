    using Sharko.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sharko.Domain.Entities
{
    public class Tag : BaseEntity
    {
        public string Name { get; set; }

        public Category Category { get; set; }
        public List<Book> Books { get; set; }
    }
}
