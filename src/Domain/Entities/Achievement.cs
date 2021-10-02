using Sharko.Domain.Common;
using System.Collections.Generic;

namespace Sharko.Domain.Entities
{
    public class Achievement : BaseEntity
    {
        public string Image { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public List<Person> Users { get; set; }
    }
}