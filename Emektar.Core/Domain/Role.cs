using System.Collections.Generic;

namespace Emektar.Core.Domain
{
    public class Role : BaseEntity
    {
        public string Name { get; set; }
        public int Value { get; set; }
        public bool IsActive { get; set; }

        public virtual ICollection<Team> Teams { get; set; }
        public virtual ICollection<User> Users { get; set; }

    }
}
