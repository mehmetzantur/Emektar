using Emektar.Core.Domain;
using System.Data.Entity.ModelConfiguration;

namespace Emektar.Data.Mapping
{
    public class TeamMap : EntityTypeConfiguration<Team>
    {
        public TeamMap()
        {
            ToTable("Team");
            HasKey(x => x.Id);
            Property(x => x.Name).HasMaxLength(50);

            //// Bir department birden fazla team içerebilir(one2many)
            //HasRequired<Department>(t => t.Department)
            //    .WithMany(d => d.Teams);

        }
    }
}







