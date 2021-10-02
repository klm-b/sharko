using Sharko.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Sharko.Domain.Entities
{
    public class Person : BaseEntity
    {
        public string FirstName { get; set; } // todo: delete
        public string LastName { get; set; } // delete
        public string UserName { get; set; }
        public string Status { get; set; }
        public string Picture { get; set; }

        // public string Email { get; set; }
        public string Bio { get; set; }
        public int Rating { get; set; }
        // public bool IsBlocked { get; set; }

        public string ApplicationUserId { get; set; }

        public List<Person> Following { get; set; }
        public List<Person> Followers { get; set; }

        // public List<Subscription> Subscriptions { get; set; }

        public List<Summary> Summaries { get; set; }
        public List<Achievement> Achievements { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Summary> LikedSummaries { get; set; }
    }
}
