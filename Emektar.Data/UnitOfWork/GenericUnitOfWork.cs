using Emektar.Data.Context;
using Emektar.Core.Domain;
using Emektar.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Emektar.Data.UnitOfWork
{
    public class GenericUnitOfWork : IDisposable
    {
        private EmektarContext _context;
        public GenericUnitOfWork()
        {
            _context = new EmektarContext();
        }

        private Dictionary<Type, object> repositories = new Dictionary<Type, object>();
        public IRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            if (repositories.Keys.Contains(typeof(TEntity)) == true)
            {
                return repositories[typeof(TEntity)] as IRepository<TEntity>;
            }
            IRepository<TEntity> repository = new GenericRepository<TEntity>(_context);
            repositories.Add(typeof(TEntity), repository);
            return repository;
        }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }

        private bool disposed = false;
        public virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }

            disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
