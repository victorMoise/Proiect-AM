using AutoMapper;
using backend.Repository.User;
using backend.Service.Encryption;
using MediatR;
using E = backend.Entities;

namespace backend.Queries.Auth
{
    public class GetUserRegister
    {
        public class Query : IRequest<Model>
        {
            public string Username { get; init; }
            public string Email { get; init; }
            public string Password { get; set; }
        }

        public class Model
        { 
            public string Username { get; init; }
            public string Email { get; init; }
        }

        internal class QueryHandler : IRequestHandler<Query, Model>
        {
            private readonly IUserRepository _userRepository;
            private readonly IMapper _mapper;
            private readonly IEncryptionService _encryptionService;

            public QueryHandler(IUserRepository repository, IMapper mapper, IEncryptionService encryptionService)
            {
                _userRepository = repository;
                _mapper = mapper;
                _encryptionService = encryptionService;
            }

            public async Task<Model> Handle(Query request, CancellationToken cancellationToken)
            {
                var password = _encryptionService.Encrypt(request.Password);
                request.Password = password;

                var user = _mapper.Map<E.User>(request);
                var result = await _userRepository.SaveUser(user);
                return _mapper.Map<Model>(result);
            }
        }
    }
}
