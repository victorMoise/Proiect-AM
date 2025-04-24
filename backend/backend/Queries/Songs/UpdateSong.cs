using backend.Repository.Song;
using backend.Service.FileSystem;
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
            public bool IsPublic { get; init; }
        }

        public record Model
        {
            public string Message { get; init; }
        }

        internal class QueryHandler : IRequestHandler<Query, Model>
        {
            private readonly ISongRepository _songRepository;
            private readonly IFileSystemService _fileSystemService;
            private readonly IConfiguration _configuration;

            public QueryHandler(ISongRepository songRepository, IFileSystemService fileSystemService, IConfiguration configuration)
            {
                _songRepository = songRepository;
                _fileSystemService = fileSystemService;
                _configuration = configuration;
            }

            public async Task<Model> Handle(Query request, CancellationToken cancellationToken)
            {
                var song = await _songRepository.GetSong(request.SongId);

                if (song == null)
                {
                    throw new KeyNotFoundException($"Song with ID {request.SongId} not found.");
                }

                var artist = await _songRepository.GetArtist(request.ArtistId);
                if (request.ArtistId != song.ArtistId)
                {
                    var filePath = song.FilePath;
                    var basePath = _configuration.GetSection("Songs").GetValue<string>("FolderPath");
                    var fullpath = Path.Combine(basePath, filePath);
                    var fileName = request.SongTitle;
                    await using (var stream = new FileStream(fullpath, FileMode.Open, FileAccess.Read))
                    {
                        var formFile = new FormFile(stream, 0, stream.Length, "file", fileName)
                        {
                            Headers = new HeaderDictionary(),
                            ContentType = "audio/mpeg"
                        };
                        await _fileSystemService.SaveFileAsync(formFile, fileName, artist.Name, basePath);
                    }
                    await _fileSystemService.DeleteFile(filePath);
                }

                song.Title = request.SongTitle;
                song.ArtistId = request.ArtistId;
                song.GenreId = request.GenreId;
                song.IsPublic = request.IsPublic;
                song.FilePath = Path.Combine(artist.Name.ToLower(), (request.SongTitle + ".mp3"));
                await _songRepository.SaveSong(song);

                return new Model { Message = "Song updated successfully." };
            }
        }
    }
}
