using AutoMapper;
using backend.Models;
using backend.Repository.Song;
using backend.Service.Token;
using MediatR;

namespace backend.Queries.Songs
{
    public class GetUserUploads
    {
        public class Query : IRequest<SongModel[]> { }

        internal class QueryHandler : IRequestHandler<Query, SongModel[]>
        {
            private readonly ISongRepository _songRepository;
            private readonly ITokenService _tokenService;
            private readonly IMapper _mapper;

            public QueryHandler(ISongRepository songRepository, ITokenService tokenService, IMapper mapper)
            {
                _songRepository = songRepository;
                _tokenService = tokenService;
                _mapper = mapper;
            }

            public async Task<SongModel[]> Handle(Query request, CancellationToken cancellationToken)
            {
                var userId = _tokenService.GetUserId();
                var entities = await _songRepository.GetUserUploads(userId.Value);
                var models = _mapper.Map<SongModel[]>(entities);
                return models;
            }
        }
    }
}
