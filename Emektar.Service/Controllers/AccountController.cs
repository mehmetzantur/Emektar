using Emektar.BLL;
using Emektar.Core.Domain;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Web.Http;

namespace Emektar.Service.Controllers
{
    [AllowAnonymous]
    
    public class AccountController : ApiController
    {
        private AccountLogic logic = new AccountLogic ();


        // GET: api/User
        
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpPost]
        public User Create([FromBody]User user)
        {
            user.CreatedTime = DateTime.Now;
            user.AddedDate = DateTime.Now;
            user.ModifiedDate = DateTime.Now;
            user.AddedBy = "System";
            user.IsActive = user.IsActive;
            return logic.Create(user);
        }
        
        [HttpPost]
        public User Update([FromBody]User user)
        {
            return logic.Update(user);
        }
        
        [HttpPost]
        public UserDepartmentTeam DepartmentTeamInsert([FromBody]UserDepartmentTeam user)
        {
            return logic.DepartmentTeamInsert(user);
        }

        [HttpPost]
        public IList GetDepartmentTeam([FromBody]UserDepartmentTeam user)
        {
            return logic.GetDepartmentTeam(user);
        }

        [HttpPost]
        public User Passive([FromBody]User user)
        {
            user.ModifiedDate = DateTime.Now;
            user.AddedBy = "System";
            return logic.Passive(user);
        }

        [HttpPost]
        public User Login([FromBody]User user)
        {
            return logic.Login(user);
        }

        

        
    }
}
