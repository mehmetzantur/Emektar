using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Emektar.Core.Domain
{
    public class UserDepartmentTeam : AuditableEntity
    {
        public int UserId { get; set; }
        public int DepartmentId { get; set; }
        public int TeamId { get; set; }
        public virtual User User { get; set; }
        public virtual Department Department { get; set; }
        public virtual Team Team { get; set; }

    }
}
