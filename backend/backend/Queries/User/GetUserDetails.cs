using AutoMapper;
using backend.Repository.User;
using backend.Service.Token;
using MediatR;

namespace backend.Queries.User
{
    public class GetUserDetails
    {
        public class Query : IRequest<Model> { }

        public class Model
        {
            public string Username { get; init; }
            public string Email { get; init; }
            public string FirstName { get; init; }
            public string LastName { get; init; }
            public string PhoneNumber { get; init; }
            public int? Age { get; init; }
        }

        internal class QueryHandler : IRequestHandler<Query, Model>
        {
            private readonly ITokenService _tokenService;
            private readonly IUserRepository _userRepository;
            private readonly IMapper _mapper;

            public QueryHandler(ITokenService tokenService, IUserRepository userRepository, IMapper mapper)
            {
                _tokenService = tokenService;
                _userRepository = userRepository;
                _mapper = mapper;
            }

            public async Task<Model> Handle(Query request, CancellationToken cancellationToken)
            {
                var userId = _tokenService.GetUserId() ?? throw new Exception("Can not extract userId from token");
                var user = await _userRepository.GetDetailedUser(userId);
                var model = _mapper.Map<Model>(user);
                return model;
            }
        }
    }
}
