using Emektar.Core.Domain;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Emektar.Website.Controllers
{
    public class AccountController : Controller
    {
        #region Varriables
        private Service.Controllers.AccountController _accountService = new Service.Controllers.AccountController();
        private User _user;
        private Department _department;
        private Team _team;
        #endregion


        public ActionResult Index()
        {
            return View();
        }
        
        [HttpPost]
        public JsonResult Create(User getUser)
        {
            _user = new User();
            _user = _accountService.Create(getUser);
            return Json(_user, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update(User getUser)
        {
            _user = new User();
            _user = _accountService.Update(getUser);
            return Json(_user, JsonRequestBehavior.AllowGet);
        }
        
        [HttpPost]
        public JsonResult DepartmentTeamInsert(List<String> values)
        {
            UserDepartmentTeam _userDT = new UserDepartmentTeam();
            _user = new User();
            _department = new Department();
            _team = new Team();
            _user.Id = Convert.ToInt32(values[0]);
            _department.Id = Convert.ToInt32(values[1]);
            _team.Id = Convert.ToInt32(values[2]);

            _userDT.User = _user;
            _userDT.Department = _department;
            _userDT.Team = _team;
            _userDT = _accountService.DepartmentTeamInsert(_userDT);
            return Json(_userDT, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult GetDepartmentTeam(List<String> values)
        {
            UserDepartmentTeam _userDT = new UserDepartmentTeam();
            _user = new User()
            {
                Id = Convert.ToInt32(values[0])
            };
            _userDT.User = _user;
            _userDT.UserId = _user.Id;
            
            return Json(_accountService.GetDepartmentTeam(_userDT), JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public JsonResult Passive(User getUser)
        {
            _user = new User();
            _user = _accountService.Passive(getUser);
            return Json(_user, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Login(User getUser)
        {
            _user = new User();
            _user = _accountService.Login(getUser);
            Session["User"] = _user;
            return Json(_user, JsonRequestBehavior.AllowGet);
        }

        public ActionResult KeepAlive()
        {
            return Json("OK", JsonRequestBehavior.AllowGet);
        }

        public ActionResult Logout()
        {
            Session.Abandon();

            return RedirectToAction("Index","Home");
        }

        [HttpPost]
        public JsonResult GetUser()
        {
            _user = new User();
            _user = (User)Session["User"];
            return Json(_user, JsonRequestBehavior.AllowGet);
        }

    }
}