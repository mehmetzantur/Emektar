using Emektar.Core.Domain;
using Emektar.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Emektar.Data.Repository
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
    {
        public void Delete(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public IList<TEntity> GetAll()
        {
            throw new NotImplementedException();
        }

        public TEntity Insert(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public void Update(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public IList<TEntity> Where(Expression<Func<TEntity, bool>> predicate)
        {
            throw new NotImplementedException();
        }
    }
}
