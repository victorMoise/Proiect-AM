using AutoMapper;
using backend.Models;
using backend.Repository.Song;
using backend.Service.Token;
using MediatR;

namespace backend.Queries.Songs
{
    public class GetPublicSongsList 
    {
        public class Query : IRequest<SongModel[]> { }

        internal class QueryHandler : IRequestHandler<Query, SongModel[]>
        {
            private readonly ISongRepository _songRepository;
            private readonly IMapper _mapper;
            private readonly ITokenService _tokenService;

            public QueryHandler(ISongRepository songRepository, IMapper mapper, ITokenService tokenService)
            {
                _songRepository = songRepository;
                _mapper = mapper;
                _tokenService = tokenService;
            }

            public async Task<SongModel[]> Handle(Query request, CancellationToken cancellationToken)
            {
                var entities = await _songRepository.GetPublicSongsList();
                var userId = _tokenService.GetUserId();
                var favorites = await _songRepository.GetUserFavorites(userId.Value);
                var models = _mapper.Map<SongModel[]>(entities);
                foreach (var model in models)
                {
                    model.IsFavorite = favorites.Any(x => x.SongId == model.Id);
                }
                return models;
            }
        }
    }
}
