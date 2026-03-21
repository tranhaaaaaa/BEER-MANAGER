using System.Linq.Expressions;
using Microsoft.AspNetCore.OData.Deltas;
using BEERAPI.Controllers;

namespace BEERAPI.Services
{
    public interface IServices<T> : IDisposable, IAsyncDisposable where T : class
    {
        IQueryable<T> GetAll();

        ValueTask<T> GetObjectAsync(Guid id);

        Task<T> GetObjectAsync(Guid id, params Expression<Func<T, object>>[] includes);

        Task<T> CreateAsync(T entity);

        Task<T> UpdateAsync(Guid id, Delta<T> entity);

        Task<T> PatchAsync(Guid id, Delta<T> entity);

        Task<bool> DeleteAsync(Guid id);

        IQueryable<T> GetSingleAsync(Guid id);
    }
}