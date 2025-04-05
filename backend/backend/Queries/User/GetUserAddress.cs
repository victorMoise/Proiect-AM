using AutoMapper;
using backend.Repository.User;
using backend.Service.Token;
using MediatR;

namespace backend.Queries.User
{
    public class GetUserAddress
    {
        public class Query : IRequest<Model> { }

        public class Model
        {
            public class CityModel
            {
                public int Id { get; init; }
                public string Code { get; init; }
                public string Name { get; init; }
            }

            public class CountryModel 
            {
                public int Id { get; init; }
                public string Code { get; init; }
                public string Name { get; init; }
            }

            public CityModel City { get; init; }
            public CountryModel Country { get; init; }
            public string Details { get; init; }
            public string Street { get; init; }
        }

        public class QueryHandler : IRequestHandler<Query, Model>
        {
            private readonly IUserRepository _userRepository;
            private readonly IMapper _mapper;
            private readonly ITokenService _tokenService;

            public QueryHandler(IUserRepository userRepository, IMapper mapper, ITokenService tokenService)
            {
                _userRepository = userRepository;
                _mapper = mapper;
                _tokenService = tokenService;
            }

            public async Task<Model> Handle(Query request, CancellationToken cancellationToken)
            {
                var userId = _tokenService.GetUserId() ?? throw new Exception("Can not extract userId from token");
                var address = await _userRepository.GetAddress(userId);
                return _mapper.Map<Model>(address);
            }
        }
    }
}
