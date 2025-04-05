using AutoMapper;
using backend.Models;
using backend.Repository.Song;
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

            public QueryHandler(ISongRepository songRepository, IMapper mapper)
            {
                _songRepository = songRepository;
                _mapper = mapper;
            }

            public async Task<SongModel[]> Handle(Query request, CancellationToken cancellationToken)
            {
                var entities = await _songRepository.GetPublicSongsList();
                var models = _mapper.Map<SongModel[]>(entities);
                return models;
            }
        }
    }
}
