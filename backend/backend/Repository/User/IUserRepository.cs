using E = backend.Entities;

namespace backend.Repository.User
{
    public interface IUserRepository
    {
        Task<E.User?> GetUserByUsername(string username, bool tracking = true);
        Task<E.User?> GetUserByEmail(string email, bool tracking = true);
        Task<E.User?> GetUserById(int id, bool tracking = true);
        Task<E.User> SaveUser(E.User user);
        Task<E.User> SaveUserDetails(E.User user);
        Task<E.User?> GetDetailedUser(int userId);
        Task<E.Address?> GetAddress(int userId);
        Task<E.Address> SaveAddress(E.User user, E.Address address);
        Task<List<E.Country>> GetCountries();
        Task<List<E.City>> GetCities(int countryId); 
    }
}
