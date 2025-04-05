using E = backend.Entities;

namespace backend.Repository.Song
{
    public interface ISongRepository
    {
        Task<E.Song[]> GetPublicSongsList();
    }
}
