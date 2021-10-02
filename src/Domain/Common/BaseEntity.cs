using System;

namespace Sharko.Domain.Common
{
    public abstract class BaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        // public string CreatedBy { get; set; }

        public DateTime? LastModified { get; set; }
        // public string LastModifiedBy { get; set; }

        public bool IsDeleted { get; set; }
        // public string DeletedBy { get; set; }
    }
}
