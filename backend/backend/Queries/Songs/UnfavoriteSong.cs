using backend.Repository.Song;
using backend.Service.Token;
using MediatR;

namespace backend.Queries.Songs
{
    public class UnfavoriteSong
    {
        public class Query : IRequest<Model>
        {
            public int SongId { get; init; }
        }

        public record Model
        {
            public string Message { get; init; }
        }

        internal class QueryHandler : IRequestHandler<Query, Model>
        {
            private readonly ISongRepository _songRepository;
            private readonly ITokenService _tokenService;

            public QueryHandler(ISongRepository songRepository, ITokenService tokenService)
            {
                _songRepository = songRepository;
                _tokenService = tokenService;
            }

            public async Task<Model> Handle(Query query, CancellationToken cancellationToken)
            {
                var userId = _tokenService.GetUserId();
                await _songRepository.UnfavoriteSong(userId.Value, query.SongId);
                return new Model
                {
                    Message = "Song unfavorited successfully"
                };
            }
        }
    }
}
