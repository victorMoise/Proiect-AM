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

        public Task<E.Favorite[]> GetUserFavorites(int userId)
        {
            var query = _dbContext.Favorites
                .Where(x => x.UserId == userId);
            return query.ToArrayAsync();
        }

        public Task<E.Song?> GetSong(int songId)
        {
            var query = _dbContext.Songs
                .Include(x => x.Artist)
                .Include(x => x.Genre)
                .Where(x => x.Id == songId);
            return query.FirstOrDefaultAsync();
        }

        public Task<E.Artist[]> GetArtists()
        {
            var query = _dbContext.Artists;
            return query.ToArrayAsync();
        }

        public Task<E.Genre[]> GetGenres()
        {
            var query = _dbContext.Genres;
            return query.ToArrayAsync();
        }

        public Task<E.Artist?> GetArtist(int id)
        {
            var query = _dbContext.Artists
                .Where(x => x.Id == id);
            return query.FirstOrDefaultAsync();
        }

        public Task<E.Genre?> GetGenre(int id)
        {
            var query = _dbContext.Genres
                .Where(x => x.Id == id);
            return query.FirstOrDefaultAsync();
        }

        public async Task<E.Artist> SaveArtist(E.Artist artist)
        {
            if (artist.Id == default)
                await _dbContext.Artists.AddAsync(artist);
            else
                _dbContext.Artists.Update(artist);

            await _dbContext.SaveChangesAsync();
            return artist;
        }

        public async Task<E.Genre> SaveGenre(E.Genre genre)
        {
            if (genre.Id == default)
                await _dbContext.Genres.AddAsync(genre);
            else
                _dbContext.Genres.Update(genre);

            await _dbContext.SaveChangesAsync();
            return genre;
        }

        public async Task<E.Song> SaveSong(E.Song song)
        {
            if (song.Id == default)
                await _dbContext.Songs.AddAsync(song);
            else
                _dbContext.Songs.Update(song);

            await _dbContext.SaveChangesAsync();
            return song;
        }

        public async Task FavoriteSong(int userId, int songId)
        {
            var favorite = new E.Favorite
            {
                UserId = userId,
                SongId = songId
            };
            await _dbContext.Favorites.AddAsync(favorite);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UnfavoriteSong(int userId, int songId)
        {
            var favorite = await _dbContext.Favorites
                .FirstOrDefaultAsync(x => x.UserId == userId && x.SongId == songId);
            if (favorite != null)
            {
                _dbContext.Favorites.Remove(favorite);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<E.Song[]> GetUserUploads(int userId)
        {
            var query = _dbContext.Songs
                .Include(x => x.Artist)
                .Include(x => x.Genre)
                .Where(x => x.OwnerId == userId);
            return await query.ToArrayAsync();
        }

        public async Task<E.Song?> DeleteSong(int songId)
        {
            var song = await _dbContext.Songs
                .Include(x => x.Artist)
                .Include(x => x.Genre)
                .FirstOrDefaultAsync(x => x.Id == songId);
            if (song != null)
            {
                _dbContext.Songs.Remove(song);
                await _dbContext.SaveChangesAsync();
            }
            return song;
        }
    }
}
