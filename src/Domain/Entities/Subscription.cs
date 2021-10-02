using Sharko.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sharko.Domain.Entities
{
    public class Subscription : BaseEntity
    {
        public int FollowingId { get; set; }
        public Person Following { get; set; }

        public int FollowerId { get; set; }
        public Person Follower { get; set; }
    }
}
