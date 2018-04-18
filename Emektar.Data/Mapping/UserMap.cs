using Emektar.Core.Domain;
using System.Data.Entity.ModelConfiguration;

namespace Emektar.Data.Mapping
{
    public class UserMap : EntityTypeConfiguration<User>
    {
        public UserMap()
        {
            ToTable("User");
            HasKey(x => x.Id);
            Property(x => x.FullName).HasMaxLength(50);
            Property(x => x.Name).HasMaxLength(50);
            Property(x => x.Password).HasMaxLength(50);
            Property(x => x.Email).HasMaxLength(100);
            Property(x => x.CreatedTime);

            

            //// Her Department birden fazla User, her User birden fazla Department içerebilir. Ara tablo(many2many)
            //HasMany(u => u.Departments)
            //    .WithMany(d => d.Users)
            //    .Map(ud => ud.ToTable("UserDepartment"));

            //// Her Team'de birden fazla User, her User birden fazla Team'de olabilir. Ara tablo(many2many)
            //HasMany(u => u.Teams)
            //    .WithMany(t => t.Users)
            //    .Map(ut => ut.ToTable("UserTeam"));

            

        }
    }
}
