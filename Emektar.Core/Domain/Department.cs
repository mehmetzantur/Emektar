using System.Collections.Generic;

namespace Emektar.Core.Domain
{
    public class Department : BaseEntity
    {
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public virtual ICollection<UserDepartmentTeam> UserDepartmentTeams { get; set; }
        public virtual ICollection<Team> Teams { get; set; }

    }
}



