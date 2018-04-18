using Emektar.BLL;
using Emektar.Core.Domain;
using System.Collections.Generic;
using System.Web.Http;

namespace Emektar.Service.Controllers
{
    public class DepartmentController : ApiController
    {
        private DepartmentLogic logic = new DepartmentLogic();


        [HttpPost]
        public IList<Department> GetDepartments()
        {
            return logic.GetDepartments();
        }

        [HttpPost]
        public Department Create([FromBody]Department department)
        {
            return logic.Create(department);
        }

        [HttpPost]
        public Department Update([FromBody]Department department)
        {
            return logic.Update(department);
        }

    }
}