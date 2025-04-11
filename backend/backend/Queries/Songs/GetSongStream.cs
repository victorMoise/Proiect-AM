using AutoMapper;
using backend.Repository.Song;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace backend.Queries.Songs
{
    public class GetSongStream
    {
        public class Query : IRequest<IActionResult>
        {
            public int Id { get; set; }
        }

        internal class QueryHandler : IRequestHandler<Query, IActionResult>
        {
            private readonly ISongRepository _songRepository;

            public QueryHandler(ISongRepository songRepository)
            {
                _songRepository = songRepository;
            }

            public async Task<IActionResult> Handle(Query request, CancellationToken cancellationToken)
            {
                var song = await _songRepository.GetSong(request.Id) ?? throw new Exception("Song does not exist");

                var basePath = Path.Combine("C:", "proiecte", "Proiect-AM", "backend", "songs");
                var songPath = Path.Combine(basePath, song.FilePath);

                if (!File.Exists(songPath))
                {
                    throw new Exception("Song file not found");
                }

                var fileStream = new FileStream(songPath, FileMode.Open, FileAccess.Read);
                return new FileStreamResult(fileStream, "audio/mpeg");
            }
        }
    }
}
