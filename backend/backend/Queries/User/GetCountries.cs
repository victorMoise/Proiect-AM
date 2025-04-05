using AutoMapper;
using backend.Repository.User;
using MediatR;

namespace backend.Queries.User
{
    public class GetCountries
    {
        public class Query : IRequest<List<Model>> { }

        public class Model
        {
            public string Id { get; init; }
            public string Name { get; init; }
            public string Code { get; init; }
        }

        internal class QueryHandler : IRequestHandler<Query, List<Model>> 
        { 
            private readonly IUserRepository _userRepository;
            private readonly IMapper _mapper;

            public QueryHandler(IUserRepository userRepository, IMapper mapper)
            {
                _userRepository = userRepository;
                _mapper = mapper;
            }

            public async Task<List<Model>> Handle(Query request, CancellationToken cancellationToken)
            {
                var countries = await _userRepository.GetCountries();
                return _mapper.Map<List<Model>>(countries);
            }
        }
    }
}
