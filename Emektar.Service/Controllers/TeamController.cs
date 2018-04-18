using Emektar.BLL;
using Emektar.Core.Domain;
using System.Collections;
using System.Collections.Generic;
using System.Web.Http;

namespace Emektar.Service.Controllers
{
    public class TeamController : ApiController
    {
        private TeamLogic logic = new TeamLogic();

        [HttpGet]
        public IList GetTeams()
        {
            return logic.GetTeams();
        }

        [HttpGet]
        public IList GetTeamsWithDepartmentId([FromBody]int Id)
        {
            return logic.GetTeamsWithDepartmentId(Id);
        }

        [HttpPost]
        public Team Create([FromBody]Team team)
        {
            return logic.Create(team);
        }

        [HttpPost]
        public Team Update([FromBody]Team team)
        {
            return logic.Update(team);
        }
    }
}