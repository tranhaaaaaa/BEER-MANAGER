namespace BEERAPI.Services
{
    public interface IServices<T> : IDisposable, IAsyncDisposable where T : class
    {
        IQueryable<T> GetAll();

        ValueTask<T> GetObjectAsync(Guid id);

        Task<int> CreateAsync(T entity);

        Task<int> UpdateAsync(T entity);

        Task<int> DeleteAsync(T entity);

        Task<IQueryable<T>> GetSingleAsync(Guid id);
    }
}
