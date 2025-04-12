using AutoMapper;
using backend.Repository.Song;
using MediatR;

namespace backend.Queries.Songs
{
    public class GetArtists
    {
        public class Query : IRequest<Model[]> { }

        public class Model
        {
            public int Id { get; init; }
            public string Name { get; init; }
        }

        internal class QueryHandler : IRequestHandler<Query, Model[]>
        {
            private readonly ISongRepository _songRepository;
            private readonly IMapper _mapper;

            public QueryHandler(ISongRepository songRepository, IMapper mapper)
            {
                _songRepository = songRepository;
                _mapper = mapper;
            }

            public async Task<Model[]> Handle(Query query, CancellationToken cancellationToken)
            {
                var entities = await _songRepository.GetArtists();
                var models = _mapper.Map<Model[]>(entities);
                return models;
            }
        }
    }
}
