using Microsoft.EntityFrameworkCore;

namespace backend.Repository.Test
{
    public class TestRepository : ITestRepository
    {
        private readonly AppDbContext _context;

        public TestRepository(AppDbContext context)
        {
            _context = context;
        }

        public Task<int> TestConnection()
        {
            return _context.Database.ExecuteSqlRawAsync("SELECT 1");
        }
    }
}
