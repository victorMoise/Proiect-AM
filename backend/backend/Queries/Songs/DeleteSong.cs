using backend.Repository.Song;
using backend.Service.FileSystem;
using MediatR;

namespace backend.Queries.Songs
{
    public class DeleteSong
    {
        public class Query : IRequest<Model>
        {
            public int SongId { get; set; }
        }

        public class Model
        {
            public string Message { get; set; }
        }

        internal class QueryHandler : IRequestHandler<Query, Model>
        {
            private readonly ISongRepository _songRepository;
            private readonly IFileSystemService _fileService;

            public QueryHandler(ISongRepository songRepository, IFileSystemService fileService)
            {
                _songRepository = songRepository;
                _fileService = fileService;
            }

            public async Task<Model> Handle(Query query, CancellationToken cancellationToken)
            {
                var result = await _songRepository.DeleteSong(query.SongId);
                if (result == null)
                    throw new KeyNotFoundException($"Song with ID {query.SongId} not found.");
                await _fileService.DeleteFile(result.FilePath);
                return new Model { Message = $"Song with id {query.SongId} deleted succcesfully" };
            }
        }
    }
}
