using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Emektar.Data.Repository
{
    public interface IRepository<TEntity>
    {
        IList<TEntity> GetAll();
        IList<TEntity> Where(Expression<Func<TEntity,bool>>predicate);
        TEntity Insert(TEntity entity);
        void Update(TEntity entity);
        
        void Delete(TEntity entity);
    }
}
