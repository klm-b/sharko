using Sharko.Domain.Common;
using System.Collections.Generic;

namespace Sharko.Domain.Entities
{
    public class Author : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Biography { get; set; }
        public string Image { get; set; }

        public List<Book> Books { get; set; }
    }
}