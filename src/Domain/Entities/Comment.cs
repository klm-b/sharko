using Sharko.Domain.Common;
using System;

namespace Sharko.Domain.Entities
{
    public class Comment : BaseEntity
    {
        public string Body { get; set; }

        public Person Author { get; set; }
        public Summary Summary { get; set; }
    }
}