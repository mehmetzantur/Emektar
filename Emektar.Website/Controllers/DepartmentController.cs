using Emektar.Core.Domain;
using Emektar.Website.Helper;
using System.Web.Mvc;

namespace Emektar.Website.Controllers
{
    [AccountAuthorize]
    public class DepartmentController : Controller
    {
        #region Varriables
        private Service.Controllers.DepartmentController _departmentService = new Service.Controllers.DepartmentController();
        private Department _department;
        #endregion

        // GET: Department
        public ActionResult Index()
        {
            return View();
        }

        
        public JsonResult GetDepartments()
        {
            return Json(_departmentService.GetDepartments(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(Department department)
        {
            _department = new Department();
            _department = _departmentService.Create(department);
            return Json(_department, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update(Department department)
        {
            _department = new Department();
            _department = _departmentService.Update(department);
            return Json(_department, JsonRequestBehavior.AllowGet);
        }

    }
}