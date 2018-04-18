using Emektar.Website.Helper;
using System.Web.Mvc;

namespace Emektar.Website.Controllers
{
    [AccountAuthorize]
    public class UserController : Controller
    {
        #region Varriables
        private Service.Controllers.UserController _userService = new Service.Controllers.UserController();
        #endregion

        // GET: User
        public ActionResult Index()
        {
            return View();
        }

        
        public JsonResult GetUsers()
        {
            return Json(_userService.GetUsers(), JsonRequestBehavior.AllowGet);
        }

        
    }
}