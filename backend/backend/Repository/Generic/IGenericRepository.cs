namespace backend.Repository.Generic
{
    public interface IGenericRepository
    {
        void DetachEntity<T>(T entity) where T : class;
    }
}
