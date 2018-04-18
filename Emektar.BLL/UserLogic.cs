using Emektar.Core.Domain;
using Emektar.Data.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Emektar.BLL
{
    public class UserLogic : BaseLogic
    {
        public UserLogic()
        {
            unitOfWork = new GenericUnitOfWork();
        }

        public IList<User> GetUsers()
        {
            try
            {

                return unitOfWork.Repository<User>().GetAll();
                //var model = unitOfWork.Repository<Team>()
                //    .GetAll()
                //    .Join(unitOfWork.Repository<Department>()
                //    .GetAll(),
                //    t => t.DepartmentId,
                //    d => d.Id,
                //    (team, department) => new
                //    {
                //        teamId = team.Id,
                //        teamName = team.Name,
                //        departmentName = department.Name,
                //        departmentId = department.Id,
                //        teamIsActive = team.IsActive
                //    });


                //return model.ToList();

            }
            catch (System.Exception)
            {
                //TODO: Catch
                throw;
            }
        }
    }
}
