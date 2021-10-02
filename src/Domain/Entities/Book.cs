using Sharko.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sharko.Domain.Entities
{
    public class Book : BaseEntity
    {
        public string Name { get; set; }
        public string EngName { get; set; }
        public int Rating { get; set; }
        public string Image { get; set; }
        public string About { get; set; }

        public List<Tag> Tags { get; set; }
        public List<Category> Categories { get; set; }
        public List<ISBN> ISBNs { get; set; }
        public List<Author> Authors { get; set; }
        public List<Summary> Summaries { get; set; }
    }
}
