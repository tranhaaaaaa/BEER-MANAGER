using BEERAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System.Reflection;

namespace BEERAPI.Services
{
    public class BaseServices<T> : IServices<T> where T : class
    {
        public IMemoryCache _cache;
        IConfiguration configuration;
        public readonly EcommerceDbContext _context;
        public BaseServices(EcommerceDbContext context, IMemoryCache cache, IConfiguration configuration)
        {
            _context = context;
            _cache = cache;
            this.configuration = configuration;
        }
       public virtual async Task<int> CreateAsync(T entity)
        {
            _context.Set<T>().Add(entity);
            var result = await _context.SaveChangesAsync();
            return result;
        }

        public virtual Task<int> DeleteAsync(T entity)
        {
            _context.Set<T>().Remove(entity);
            var result = _context.SaveChangesAsync();
            return result;
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public ValueTask DisposeAsync()
        {
            return _context.DisposeAsync();
        }

        public virtual IQueryable<T> GetAll()
        {
            return _context.Set<T>();
        }

        public virtual ValueTask<T> GetObjectAsync(Guid id)
        {
            return _context.Set<T>().FindAsync(id);
            // throw new NotImplementedException();
        }

        public virtual Task<IQueryable<T>> GetSingleAsync(Guid id)
        {
            throw new NotImplementedException();
        }

     
        public virtual Task<int> UpdateAsync(T entity)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));
            _context.Entry(entity).State = EntityState.Modified;
            var result = _context.SaveChangesAsync();
            return result;
        }
     

    }
}
