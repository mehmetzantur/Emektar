using Emektar.Core.Domain;
using Emektar.Website.Helper;
using System.Web.Mvc;

namespace Emektar.Website.Controllers
{
    [AccountAuthorize]
    public class TeamController : Controller
    {
        #region Varriables
        private Service.Controllers.TeamController _teamService = new Service.Controllers.TeamController();
        private Team _team;
        #endregion

        // GET: Team
        public ActionResult Index()
        {
            return View();
        }

        
        public JsonResult GetTeams()
        {
            return Json(_teamService.GetTeams(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTeamsWithDepartmentId(Department department)
        {
            return Json(_teamService.GetTeamsWithDepartmentId(department.Id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(Team team)
        {
            _team = new Team();
            _team = _teamService.Create(team);
            return Json(_team, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update(Team team)
        {
            _team = new Team();
            _team = _teamService.Update(team);
            return Json(_team, JsonRequestBehavior.AllowGet);
        }
    }
}