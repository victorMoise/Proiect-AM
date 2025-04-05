using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Configuration
{
    public class AdressConfiguration : IEntityTypeConfiguration<Address>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Address> builder)
        {
            builder.ToTable("addresses").HasKey(x => x.Id);
            builder.Property(x => x.CityId).IsRequired();
        }
    }
}
