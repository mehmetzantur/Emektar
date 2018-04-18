using Emektar.Core.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Emektar.Data.Mapping
{
    public class UserDepartmentTeamMap : EntityTypeConfiguration<UserDepartmentTeam>
    {
        public UserDepartmentTeamMap()
        {
            ToTable("UserDepartmentTeam");
            HasKey(x => x.Id);

            //HasRequired<UserDepartmentTeam>(t => t.User)
            //        .WithMany(d => d.);
        }
        
    }
}
