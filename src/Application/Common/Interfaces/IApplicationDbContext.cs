using Microsoft.EntityFrameworkCore;
using Sharko.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Sharko.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        public DbSet<Subscription> Subscriptions { get; set; }

        public DbSet<Summary> Summaries { get; set; }
        public DbSet<SummaryLabel> SummaryLabels { get; set; }

        public DbSet<Book> Books { get; set; }

        public DbSet<Author> Authors { get; set; }

        public DbSet<Achievement> Achivments { get; set; }

        public DbSet<Chapter> Chapters { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Complaint> Complaints { get; set; }

        public DbSet<Label> Labels { get; set; }

        public DbSet<Tag> Tags { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<ISBN> ISBNs { get; set; }

        public DbSet<Person> Persons { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken());
    }
}
