using Emektar.Core.Domain;
using Emektar.Data.UnitOfWork;
using System;
using System.Collections.Generic;

namespace Emektar.BLL
{
    public class DepartmentLogic : BaseLogic
    {

        public DepartmentLogic()
        {
            unitOfWork = new GenericUnitOfWork();
        }

        private bool DepartmentIsNull(Department department)
        {
            if (department == null)
                return true;
            return false;
        }

        public IList<Department> GetDepartments()
        {
            try
            {

                return unitOfWork.Repository<Department>().GetAll();

            }
            catch (System.Exception)
            {
                //TODO: Catch
                throw;
            }
        }

        public Department Create(Department department)
        {
            try
            {
                if (!String.IsNullOrEmpty(department.Name))
                {
                    department = unitOfWork.Repository<Department>().Insert(department);
                    unitOfWork.SaveChanges();
                    return department;
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


        public Department Update(Department department)
        {
            try
            {
                if (!DepartmentIsNull(department))
                {
                    Department updatingDepartment = unitOfWork.Repository<Department>().Where(x => x.Id == department.Id)[0];
                    updatingDepartment.Name = department.Name;
                    updatingDepartment.IsActive = department.IsActive;

                    department = updatingDepartment;
                    unitOfWork.Repository<Department>().Update(department);
                    unitOfWork.SaveChanges();
                    return department;
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
