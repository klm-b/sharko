using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sharko.Domain.Entities;

namespace Sharko.Infrastructure.Persistence.Configurations
{
    public class SummaryConfiguration : IEntityTypeConfiguration<Summary>
    {
        public void Configure(EntityTypeBuilder<Summary> builder)
        {

            builder
            .HasMany(p => p.Labels)
            .WithMany(p => p.Summaries)
            .UsingEntity<SummaryLabel>(
                j => j
                    .HasOne(sl => sl.Label)
                    .WithMany(l => l.SummaryLabels)
                    .HasForeignKey(pt => pt.LabelId),
                j => j
                    .HasOne(sl => sl.Summary)
                    .WithMany(s => s.SummaryLabels)
                    .HasForeignKey(sl => sl.SummaryId),
                j =>
                {
                    j.HasKey(t => new { t.SummaryId, t.LabelId });
                });
        }
    }
}
