using System;
using System.ComponentModel.DataAnnotations;

namespace Emektar.Core.Domain
{
    public class AuditableEntity : BaseEntity
    {
        protected AuditableEntity()
        {
            ModifiedDate = DateTime.Now;
        }
        [MaxLength(256)]
        public string AddedBy { get; set; }
        public DateTime AddedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
