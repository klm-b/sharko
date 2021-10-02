using Sharko.Domain.Common;
using System;
using System.Collections.Generic;

namespace Sharko.Domain.Entities
{
    public class Summary : BaseEntity
    {
        public Person Creator { get; set; }
        public int CreatorId { get; set; }

        public Book Book { get; set; }
        public int BookId { get; set; }

        public int Rating { get; set; }
        public bool IsPublic { get; set; }

        public string About { get; set; }


        public List<Chapter> Chapters { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Label> Labels { get; set; }
        public List<Person> PersonsLiked { get; set; }

        public List<SummaryLabel> SummaryLabels { get; set; }
    }
}