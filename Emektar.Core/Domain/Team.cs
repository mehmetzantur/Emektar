using System.Collections.Generic;

namespace Emektar.Core.Domain
{
    public class Team : BaseEntity
    {
        public string Name { get; set; }
        public int DepartmentId { get; set; }
        public bool IsActive { get; set; }
        public virtual Department Department { get; set; }
        public virtual ICollection<UserDepartmentTeam> UserDepartmentTeams { get; set; }
        public virtual ICollection<Role> Roles { get; set; }
    }
}
