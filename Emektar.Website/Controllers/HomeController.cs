﻿using Emektar.Website.Helper;
using System.Web.Mvc;

namespace Emektar.Website.Controllers
{

    [AccountAuthorize]
    public class HomeController : Controller
    {
        

        public HomeController()
        {
           
        }
        public ActionResult Index()
        {
            
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}