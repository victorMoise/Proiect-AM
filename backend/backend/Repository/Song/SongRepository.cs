using Microsoft.EntityFrameworkCore;
using E = backend.Entities;

namespace backend.Repository.Song
{
    public class SongRepository : ISongRepository
    {
        private readonly AppDbContext _dbContext;

        public SongRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<E.Song[]> GetPublicSongsList()
        {
            var query = _dbContext.Songs
                .Include(x => x.Artist)
                .Include(x => x.Genre);
            return query.ToArrayAsync();
        }
    }
}
