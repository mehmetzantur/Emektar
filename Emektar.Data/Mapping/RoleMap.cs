using Emektar.Core.Domain;
using System.Data.Entity.ModelConfiguration;

namespace Emektar.Data.Mapping
{
    public class RoleMap : EntityTypeConfiguration<Role>
    {
        public RoleMap()
        {
            ToTable("Role");
            HasKey(x => x.Id);
            Property(x => x.Name).HasMaxLength(50);
            Property(x => x.Value);

            // Her Team'de birden fazla Role, her Role birden fazla Team'de olabilir. Ara tablo(many2many)
            HasMany(r => r.Teams)
                .WithMany(t => t.Roles)
                .Map(ut => ut.ToTable("TeamRole"));

            // Her User'da birden fazla Role, her Role birden fazla User'da olabilir. Ara tablo(many2many)
            HasMany(u => u.Users)
                .WithMany(r => r.Roles)
                .Map(ur => ur.ToTable("UserRole"));

        }
    }
}
