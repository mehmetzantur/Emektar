using Emektar.Core.Domain;
using Emektar.Data.Mapping;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Emektar.Data.Context
{
    public class EmektarContext : DbContext
    {
        public EmektarContext() : base("name=EmektarContext")
        {
            Configuration.LazyLoadingEnabled = true;
            this.Configuration.ProxyCreationEnabled = false;
        }

        #region DbSet

        public DbSet<Role> Role { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Department> Department { get; set; }
        public DbSet<Team> Team { get; set; }

        #endregion

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            #region Mapping
            {
                //modelBuilder.Configurations.Add(new RoleMap());
                modelBuilder.Configurations.Add(new UserMap());
                modelBuilder.Configurations.Add(new DepartmentMap());
                modelBuilder.Configurations.Add(new TeamMap());
                modelBuilder.Configurations.Add(new UserDepartmentTeamMap());
            }
            #endregion

            base.OnModelCreating(modelBuilder);
        }

    }
}
