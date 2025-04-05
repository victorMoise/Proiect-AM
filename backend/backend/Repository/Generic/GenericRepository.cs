using Microsoft.EntityFrameworkCore;

namespace backend.Repository.Generic
{
    public class GenericRepository : IGenericRepository 
    {
        private readonly AppDbContext _dbContext;

        public GenericRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void DetachEntity<T>(T entity) where T : class
        {
            if (entity != null)
            {
                var entry = _dbContext.Entry(entity);
                if (entry.State == EntityState.Detached) return;

                entry.State = EntityState.Detached;
            }
        }
    }
}
