using E = backend.Entities;

namespace backend.Repository.Song
{
    public interface ISongRepository
    {
        Task<E.Song[]> GetPublicSongsList();
        Task<E.Favorite[]> GetUserFavorites(int userId);
        Task<E.Song?> GetSong(int songId);
        Task<E.Artist[]> GetArtists();
        Task<E.Genre[]> GetGenres();
        Task<E.Artist?> GetArtist(int id);
        Task<E.Genre?> GetGenre(int id);
        Task<E.Artist> SaveArtist(E.Artist artist);
        Task<E.Genre> SaveGenre(E.Genre genre);
        Task<E.Song> SaveSong(E.Song song);
        Task FavoriteSong(int userId, int songId);
    }
}
