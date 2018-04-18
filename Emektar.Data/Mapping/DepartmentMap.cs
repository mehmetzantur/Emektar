using Emektar.Core.Domain;
using System.Data.Entity.ModelConfiguration;

namespace Emektar.Data.Mapping
{
    public class DepartmentMap : EntityTypeConfiguration<Department>
    {
        public DepartmentMap()
        {
            ToTable("Department");
            HasKey(x => x.Id);
            Property(x => x.Name).HasMaxLength(50);

           
        }
    }
}
