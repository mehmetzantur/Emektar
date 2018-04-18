using Emektar.Core.Domain;
using Emektar.Data.UnitOfWork;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Emektar.BLL
{
    public class AccountLogic : BaseLogic
    {
        public AccountLogic()
        {
            unitOfWork = new GenericUnitOfWork();
        }

        private bool UserIsNull(User user)
        {
            if (user == null)
                return true;
            return false;
        }

        public User Create(User user)
        {
            try
            {
                if (!UserIsNull(user))
                {
                    user = unitOfWork.Repository<User>().Insert(user);
                    unitOfWork.SaveChanges();
                    return user;
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


        public User Update(User user)
        {
            try
            {
                if (!UserIsNull(user))
                {
                    User updatingUser = unitOfWork.Repository<User>().Where(x => x.Id == user.Id)[0];
                    updatingUser.FullName = user.FullName;
                    updatingUser.Name = user.Name;
                    updatingUser.Password = user.Password;
                    updatingUser.Email = user.Email;
                    updatingUser.ModifiedDate = DateTime.Now;
                    updatingUser.IsActive = user.IsActive;
                    user = updatingUser;
                    unitOfWork.Repository<User>().Update(user);
                    unitOfWork.SaveChanges();
                    return user;
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


        public UserDepartmentTeam DepartmentTeamInsert(UserDepartmentTeam user)
        {
            try
            {
                if (user != null)
                {
                    if (unitOfWork.Repository<UserDepartmentTeam>().Where(x => x.UserId == user.User.Id && x.DepartmentId == user.Department.Id && x.TeamId == user.Team.Id).Count == 0)
                    {
                        UserDepartmentTeam updatingUserDT = new UserDepartmentTeam()
                        {
                            UserId = user.User.Id,
                            DepartmentId = user.Department.Id,
                            TeamId = user.Team.Id,
                            AddedBy = "System",
                            AddedDate = DateTime.Now,
                            ModifiedDate = DateTime.Now
                        };
                        user = updatingUserDT;
                        unitOfWork.Repository<UserDepartmentTeam>().Insert(user);

                        unitOfWork.SaveChanges();
                        return user;
                    }
                    else
                    {
                        user.Id = -1;
                        return user;
                    }


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





        /// <summary>
        /// Ön taraftan gelen User'ın departmanını ve takımını döndürür.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public IList GetDepartmentTeam(UserDepartmentTeam user)
        {
            try
            {
                if (user != null)
                {
                    UserDepartmentTeam updatingUserDT = new UserDepartmentTeam();

                    var model = unitOfWork.Repository<UserDepartmentTeam>().Where(u => u.UserId == user.UserId)
                        .Join(unitOfWork.Repository<Department>().GetAll(), udt => udt.DepartmentId, d => d.Id, (udt, d) => new { udt, d })
                        .Join(unitOfWork.Repository<Team>().GetAll(), x => x.udt.TeamId, t => t.Id, (x, t) => new
                        {
                            udtId = x.udt.Id,
                            userId = x.udt.UserId,
                            departmentName = x.d.Name,
                            teamName = t.Name
                        });

                    return model.ToList();
                    
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




        public User Passive(User user)
        {
            try
            {
                if (!UserIsNull(user))
                {
                    User updatingUser = unitOfWork.Repository<User>().Where(x => x.Id == user.Id)[0];
                    updatingUser.IsActive = false;
                    user = updatingUser;
                    unitOfWork.Repository<User>().Update(user);
                    unitOfWork.SaveChanges();
                    return user;
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


        public User Login(User user)
        {
            try
            {
                if (!UserIsNull(user))
                    return unitOfWork.Repository<User>().Where(x => x.Name == user.Name && x.Password == user.Password)[0];
                return null;
            }
            catch (System.Exception)
            {

                throw;
            }

        }


    }
}
