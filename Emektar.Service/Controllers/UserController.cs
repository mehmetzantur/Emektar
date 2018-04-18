using Emektar.BLL;
using Emektar.Core.Domain;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Mvc;

namespace Emektar.Service.Controllers
{
    public class UserController : ApiController
    {
        private UserLogic logic = new UserLogic();


        public IList<User> GetUsers()
        {
            return logic.GetUsers();
        }

       
        
    }
}