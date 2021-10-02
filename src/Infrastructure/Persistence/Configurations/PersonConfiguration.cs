using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sharko.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sharko.Infrastructure.Persistence.Configurations
{
    public class PersonConfiguration : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> builder)
        {
            builder.HasMany(p => p.LikedSummaries)
                .WithMany(p => p.PersonsLiked)
                .UsingEntity(e => e.ToTable("Likes"));

            builder
            .HasMany(p => p.Followers)
            .WithMany(p => p.Following)
            .UsingEntity<Subscription>(
                j => j
                    .HasOne(pt => pt.Follower)
                    .WithMany()
                    .HasForeignKey(pt => pt.FollowerId),
                j => j
                    .HasOne(pt => pt.Following)
                    .WithMany()
                    .HasForeignKey(pt => pt.FollowingId));

            builder.HasMany(p => p.Summaries)
                .WithOne(s => s.Creator)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
