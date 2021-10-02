using Sharko.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sharko.Domain.Entities
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Key { get; set; }
        public List<Tag> Tags { get; set; }
        public List<Book> Books { get; set; }
    }
}
