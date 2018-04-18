using Emektar.Core.Domain;
using Emektar.Data.UnitOfWork;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Emektar.BLL
{
    public class TeamLogic : BaseLogic
    {
        public TeamLogic()
        {
            unitOfWork = new GenericUnitOfWork();
        }

        private bool TeamIsNull(Team team)
        {
            if (team == null)
                return true;
            return false;
        }
        
        public IList GetTeams()
        {
            try
            {
                //return unitOfWork.Repository<Team>().GetAll();
                var model = unitOfWork.Repository<Team>()
                    .GetAll()
                    .Join(unitOfWork.Repository<Department>()
                    .GetAll(),
                    t => t.DepartmentId, 
                    d => d.Id, 
                    (team, department) => new
                    {
                        teamId = team.Id,
                        teamName = team.Name,
                        departmentName = department.Name,
                        departmentId = department.Id,
                        teamIsActive = team.IsActive
                    });


                return model.ToList();

            }
            catch (System.Exception)
            {
                //TODO: Catch
                throw;
            }
        }


        public IList GetTeamsWithDepartmentId(int Id)
        {
            try
            {
                return unitOfWork.Repository<Team>().Where(x => x.DepartmentId == Id).ToList();
                
            }
            catch (System.Exception)
            {
                //TODO: Catch
                throw;
            }
        }

        public Team Create(Team team)
        {
            try
            {
                if (!String.IsNullOrEmpty(team.Name))
                {
                    team = unitOfWork.Repository<Team>().Insert(team);
                    unitOfWork.SaveChanges();
                    return team;
                }
                else
                {
                    return null;
                }

            }
            catch (System.Exception)
            {
                //TODO: Catch
                throw;
            }
        }


        public Team Update(Team team)
        {
            try
            {
                if (!TeamIsNull(team))
                {
                    Team updatingTeam = unitOfWork.Repository<Team>().Where(x => x.Id == team.Id)[0];
                    updatingTeam.Name = team.Name;
                    updatingTeam.DepartmentId = team.DepartmentId;
                    updatingTeam.IsActive = team.IsActive;
                    team = updatingTeam;
                    unitOfWork.Repository<Team>().Update(team);
                    unitOfWork.SaveChanges();
                    return team;
                }
                else
                {
                    return null;
                }

            }
            catch (System.Exception)
            {
                //TODO: Catch
                throw;
            }
        }

    }
}
