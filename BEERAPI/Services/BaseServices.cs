using BEERAPI.Controllers;
using BEERAPI.Models;
using BEERAPI.Services.Helper;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;
using System.Linq.Expressions;
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

        public virtual async Task<T> CreateAsync(T entity)
        {
            _context.Set<T>().Add(entity);
            var result = await _context.SaveChangesAsync();
            return entity;
        }


        public virtual async ValueTask<T?> GetObjectAsync(Guid id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public virtual async Task<bool> DeleteAsync(Guid id)
        {
            var original = await GetObjectAsync(id);
            if (original == null) return false;


            _context.Set<T>().Remove(original);
            var result = _context.SaveChangesAsync();
            return true;
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


        public virtual IQueryable<T> GetSingleAsync(Guid id)
        {
            return _context.Set<T>()
                .Where(x => EF.Property<Guid>(x, "Id") == id);

            //return Task.FromResult(query);
        }

        public async Task<T> GetObjectAsync(Guid id, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _context.Set<T>();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.FirstOrDefaultAsync(x =>
                EF.Property<Guid>(x, "Id") == id);
        }

        public virtual async Task<T> UpdateAsync(Guid id, Delta<T> entity)
        {
            if(entity == null)
                return null;

            var original = await GetObjectAsync(id);
            if (original == null) return null;

            entity.Put(original);

            await _context.SaveChangesAsync();
            return original;
        }

        public virtual async Task<T?> PatchAsync(Guid id, Delta<T> delta)
        {
            var original = await GetObjectAsync(id);
            if (original == null) return null;

            delta.Patch(original);

            await _context.SaveChangesAsync();
            return original;
        }
    }
}