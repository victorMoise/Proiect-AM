using backend.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Configuration
{
    public class SongConfiguration : IEntityTypeConfiguration<Song>
    {
        public void Configure(EntityTypeBuilder<Song> builder)
        {
            builder.ToTable("songs").HasKey(x => x.Id);
            builder.Property(x => x.Title).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Duration).IsRequired(); 
            builder.Property(x => x.FilePath).HasColumnName("path").IsRequired().HasMaxLength(255);
            builder.Property(x => x.ArtistId).IsRequired();
            builder.Property(x => x.GenreId).IsRequired();
            builder.Property(x => x.ArtistId).IsRequired(false);
        }
    }
}
