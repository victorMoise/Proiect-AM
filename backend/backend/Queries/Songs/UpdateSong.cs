using backend.Repository.Song;
using MediatR;

namespace backend.Queries.Songs
{
    public class UpdateSong
    {
        public class Query : IRequest<Model>
        {
            public int SongId { get; init; }
            public string SongTitle { get; init; }
            public int ArtistId { get; init; }
            public int GenreId { get; init; }
        }

        public record Model
        {
            public string Message { get; init; }
        }

        internal class QueryHandler : IRequestHandler<Query, Model>
        {
            private readonly ISongRepository _songRepository;

            public QueryHandler(ISongRepository songRepository)
            {
                _songRepository = songRepository;
            }

            public async Task<Model> Handle(Query request, CancellationToken cancellationToken)
            {
                var song = await _songRepository.GetSong(request.SongId);
                if (song == null)
                {
                    throw new KeyNotFoundException($"Song with ID {request.SongId} not found.");
                }

                song.Title = request.SongTitle;
                song.ArtistId = request.ArtistId;
                song.GenreId = request.GenreId;

                await _songRepository.SaveSong(song);

                return new Model { Message = "Song updated successfully." };
            }
        }
    }
}
