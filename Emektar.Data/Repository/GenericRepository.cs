using Emektar.Data.Context;
using Emektar.Core.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace Emektar.Data.Repository
{
    public class GenericRepository<TEntity> :
        IRepository<TEntity> where TEntity : BaseEntity
    {
        private EmektarContext _context;
        public GenericRepository(EmektarContext context)
        {
            _context = context;
        }
        public EmektarContext Context
        {
            get { return _context; }
            set { _context = value; }
        }
        
        public virtual IList<TEntity> GetAll()
        {
            return _context.Set<TEntity>().ToList();
        }

        

        public virtual IList<TEntity> Where(Expression<Func<TEntity, bool>> predicate)
        { 
            return _context.Set<TEntity>().Where(predicate).ToList();
        }

        public virtual TEntity Insert(TEntity entity)
        {
            return _context.Set<TEntity>().Add(entity);
        }

        public virtual void Update(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
        }

        public virtual void Delete(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
        }


    }
}
