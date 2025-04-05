using backend.Constants;
using Microsoft.EntityFrameworkCore;
using E = backend.Entities;

namespace backend.Repository.User
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _dbContext;

        public UserRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<E.User?> GetUserByUsername(string username, bool tracking)
        {
            var query = _dbContext.Users
                .Include(u => u.Role)
                .Where(u => u.Username == username);
            if (!tracking)
                query = query.AsNoTracking();

            return query.FirstOrDefaultAsync();
        }

        public Task<E.User?> GetUserByEmail(string email, bool tracking)
        {
            var query = _dbContext.Users
                .Include(u => u.Role)
                .Where(u => u.Email == email);
            if (!tracking)
                query = query.AsNoTracking();

            return query.FirstOrDefaultAsync();
        }

        public Task<E.User?> GetUserById(int id, bool tracking)
        {
            var query = _dbContext.Users.Where(u => u.Id == id);
            if (!tracking)
                query = query.AsNoTracking();

            return query.FirstOrDefaultAsync();
        }

        public async Task<E.User> SaveUser(E.User user)
        {
            if (user.Id == default)
            {
                user.RoleId = UserRoles.USER;
                _dbContext.Users.Add(user);
            }
            else
                _dbContext.Users.Update(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }

        public async Task<E.User> SaveUserDetails(E.User user)
        {
            if (user.Id == default)
            {
                user.RoleId = UserRoles.USER;
                _dbContext.Users.Add(user);
            }
            else
            {
                var existingUser = await _dbContext.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == user.Id);

                if (existingUser != null)
                {
                    user.Password = existingUser.Password;
                    user.RoleId = existingUser.RoleId;
                    user.AddressId = existingUser.AddressId;

                    _dbContext.Entry(user).Property(u => u.Password).IsModified = false;

                    _dbContext.Entry(user).Property(u => u.Username).IsModified = true;
                    _dbContext.Entry(user).Property(u => u.Email).IsModified = true;
                    _dbContext.Entry(user).Property(u => u.FirstName).IsModified = true;
                    _dbContext.Entry(user).Property(u => u.LastName).IsModified = true;
                    _dbContext.Entry(user).Property(u => u.PhoneNumber).IsModified = true;
                    _dbContext.Entry(user).Property(u => u.Age).IsModified = true;
                }

                _dbContext.Users.Update(user);
            }

            await _dbContext.SaveChangesAsync();
            return user;
        }


        public Task<E.User?> GetDetailedUser(int userId)
        {
            var user = _dbContext.Users
                .Where(x => x.Id == userId)
                .Include(x => x.Role)
                .FirstOrDefaultAsync();
            return user;
        }

        public Task<E.Address?> GetAddress(int userId)
        {
            var address = _dbContext.Users
                .Where(x => x.Id == userId)
                .Include(x => x.Address)
                    .ThenInclude(x => x.City)
                        .ThenInclude(x => x.Country)
                .Select(x => x.Address)
                .FirstOrDefaultAsync();
            return address;
        }

        public Task<E.Address> SaveAddress(E.User user, E.Address address)
        {
            if (user.AddressId == null)
            {
                _dbContext.Addresses.Add(address);
                _dbContext.SaveChanges();
                user.AddressId = address.Id;
                _dbContext.Users.Update(user);
                _dbContext.SaveChanges();
            }

            var existingAddress = _dbContext.Addresses.FirstOrDefault(x => x.Id == user.AddressId);
            if (existingAddress != null)
            {
                existingAddress.CityId = address.CityId;
                existingAddress.Details = address.Details;
                existingAddress.Street = address.Street;
                _dbContext.Addresses.Update(existingAddress);
                _dbContext.SaveChanges();
            }
            return Task.FromResult(address);
        }

        public Task<List<E.Country>> GetCountries()
        {
            return _dbContext.Countries.ToListAsync();
        }

        public Task<List<E.City>> GetCities(int countryId)
        {
            return _dbContext.Cities.Where(x => x.CountryId == countryId).ToListAsync();
        }
    }
}
