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
            public long? StartByte { get; set; }
            public long? EndByte { get; set; }
            public Microsoft.AspNetCore.Http.HttpContext HttpContext { get; set; } 
        }

        internal class QueryHandler : IRequestHandler<Query, IActionResult>
        {
            private readonly ISongRepository _songRepository;
            private readonly IConfiguration _configuration;

            public QueryHandler(ISongRepository songRepository, IConfiguration configuration)
            {
                _songRepository = songRepository;
                _configuration = configuration;
            }

            public async Task<IActionResult> Handle(Query request, CancellationToken cancellationToken)
            {
                var song = await _songRepository.GetSong(request.Id) ?? throw new Exception("Song does not exist");

                var basePath = _configuration.GetSection("Songs").GetValue<string>("FolderPath");
                var songPath = Path.Combine(basePath, song.FilePath);

                if (!File.Exists(songPath))
                {
                    return new NotFoundResult();
                }

                var fileInfo = new FileInfo(songPath);
                long fileSize = fileInfo.Length;
                long startByte = request.StartByte ?? 0;
                long endByte = request.EndByte ?? fileSize - 1;

                if (startByte >= fileSize || endByte >= fileSize)
                {
                    return new BadRequestObjectResult("Invalid byte range");
                }

                var fileStream = new FileStream(songPath, FileMode.Open, FileAccess.Read);
                fileStream.Seek(startByte, SeekOrigin.Begin);

                var contentLength = endByte - startByte + 1;
                request.HttpContext.Response.Headers.Append("Content-Range", $"bytes {startByte}-{endByte}/{fileSize}");
                request.HttpContext.Response.StatusCode = 206;

                return new FileStreamResult(fileStream, "audio/mpeg")
                {
                    FileDownloadName = $"{song.Title}.mp3",
                    EnableRangeProcessing = true
                };
            }
        }
    }
}
