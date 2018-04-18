using System;
using System.Collections.Generic;

namespace Emektar.Core.Domain
{
    public class User : AuditableEntity
    {
        public string FullName { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public DateTime CreatedTime { get; set; }
        public bool IsActive { get; set; }

        
        public virtual ICollection<Role> Roles { get; set; }
        public virtual ICollection<UserDepartmentTeam> UserDepartmentTeams { get; set; }

    }
}
