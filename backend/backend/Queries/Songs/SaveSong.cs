using AutoMapper;
using backend.Entities;
using backend.Repository.Song;
using backend.Service.FileSystem;
using backend.Service.Token;
using FluentValidation;
using MediatR;
using NAudio.Lame;
using NAudio.Wave;

namespace backend.Queries.Songs
{
    public class SaveSong
    {
        public class Query : IRequest<Model>
        {
            public IFormFile File { get; init; }
            public string Title { get; init; }
            public bool IsPublic { get; init; }
            public bool AllowConvert { get; init; }
            public int? ArtistId { get; init; }
            public int? GenreId { get; init; }
            public string? NewArtistName {get; init; }
            public string? NewGenreName { get; init; }
        }

        public class Model
        {
            public string Message { get; init; }
        }

        public class Validator : AbstractValidator<Query>
        {
            public Validator()
            {
                RuleFor(x => x.File)
                    .NotNull()
                    .WithMessage("File is required")
                    .Must(file => file.Length > 0);

                RuleFor(x => x)
                   .Must(x => x.ArtistId.HasValue || !string.IsNullOrWhiteSpace(x.NewArtistName))
                   .WithMessage("Either artistId or newArtistName must be provided.");

                RuleFor(x => x)
                    .Must(x => x.GenreId.HasValue || !string.IsNullOrWhiteSpace(x.NewGenreName))
                    .WithMessage("Either genreId or newGenreName must be provided.");
            }
        }

        internal class QueryHandler : IRequestHandler<Query, Model>
        {
            private readonly ISongRepository _songRepository;
            private readonly IMapper _mapper;
            private readonly IConfiguration _configuration;
            private readonly ITokenService _tokenService;
            private readonly IFileSystemService _fileSystemService;

            public QueryHandler(ISongRepository songRepository, IMapper mapper, IConfiguration configuration, ITokenService tokenService, IFileSystemService fileSystemService)
            {
                _songRepository = songRepository;
                _mapper = mapper;
                _configuration = configuration;
                _tokenService = tokenService;
                _fileSystemService = fileSystemService;
            }

            public async Task<Model> Handle(Query request, CancellationToken cancellationToken)
            {
                var artist = new Artist();
                var maxArtistNameLength = 100;
                if (request.ArtistId.HasValue)
                {
                    var entitiy = await _songRepository.GetArtist(request.ArtistId.Value);
                    if (entitiy == null)
                        return new Model { Message = "Artist not found" };
                    artist = entitiy;
                }
                else
                {
                    var newArtist = new Artist
                    {
                        Name = Truncte(request.NewArtistName, maxArtistNameLength)
                    };
                    var entitiy = await _songRepository.SaveArtist(newArtist);
                    artist = entitiy;
                }

                var genre = new Genre();
                var maxGenreNameLength = 100;
                var maxGenreCodeLength = 20;
                if (request.GenreId.HasValue)
                {
                    var entitiy = await _songRepository.GetGenre(request.GenreId.Value);
                    if (entitiy == null)
                        return new Model { Message = "Genre not found" };
                    genre = entitiy;
                }
                else
                {
                    var newGenre = new Genre
                    {
                        Name = Truncte(request.NewGenreName, maxGenreNameLength),
                        Code = Truncte(request.NewGenreName, maxGenreCodeLength).ToUpper()
                    };
                    var entitiy = await _songRepository.SaveGenre(newGenre);
                    genre = entitiy;
                }

                var songsFolderPath = _configuration.GetSection("Songs").GetValue<string>("FolderPath");
                var userId = _tokenService.GetUserId();

                var originalExtension = Path.GetExtension(request.File.FileName)?.ToLowerInvariant();
                var isConversionRequired = request.AllowConvert && originalExtension != ".mp3";

                var relativePath = Path.Combine(artist.Name.ToLower(), $"{request.Title}{(isConversionRequired ? ".mp3" : originalExtension)}");
                var fullPath = Path.Combine(songsFolderPath, relativePath);

                if (isConversionRequired)
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(fullPath)!);

                    var tempFilePath = Path.GetTempFileName();
                    await using (var stream = new FileStream(tempFilePath, FileMode.Create))
                    {
                        await request.File.CopyToAsync(stream);
                    }

                    using var reader = new AudioFileReader(tempFilePath);
                    using var writer = new LameMP3FileWriter(fullPath, reader.WaveFormat, LAMEPreset.STANDARD);
                    reader.CopyTo(writer);

                    File.Delete(tempFilePath);
                }
                else
                {
                    await _fileSystemService.SaveFileAsync(request.File, request.Title, artist.Name, songsFolderPath);
                }

                int duration;
                try
                {
                    using var audioFile = TagLib.File.Create(fullPath);
                    duration = (int)audioFile.Properties.Duration.TotalSeconds;
                }
                catch
                {
                    duration = 0;
                }

                var song = new Song
                {
                    Title = request.Title,
                    OwnerId = userId,
                    IsPublic = request.IsPublic,
                    ArtistId = artist.Id,
                    GenreId = genre.Id,
                    FilePath = relativePath,
                    Duration = duration
                };

                await _songRepository.SaveSong(song);
                return new Model { Message = "Song saved successfully" };
            }

            
            private static string Truncte(string item, int maxLength)
            {
                if (item.Length > maxLength)
                    return item[..maxLength];
                return item;
            }

            private double GetMp3Duration(string filePath)
            {
                using (var reader = new Mp3FileReader(filePath))
                {
                    return reader.TotalTime.TotalSeconds; // Duration in seconds
                }
            }
        }
    }
}
