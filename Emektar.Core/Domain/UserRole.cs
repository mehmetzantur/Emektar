using System.Collections.Generic;

namespace Emektar.Core.Domain
{
    public class UserRole : BaseEntity
    {
        public int UserId { get; set; }
        public int RoleGroupId { get; set; }

        public virtual User User { get; set; }
        public virtual Role RoleGroup { get; set; }
    }
}
