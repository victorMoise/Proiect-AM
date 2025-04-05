using AutoMapper;
using backend.Repository.User;
using backend.Service.Encryption;
using backend.Service.Token;
using FluentValidation;
using MediatR;

namespace backend.Queries.Auth
{
    public class GetUserLogin 
    {
        public class Query : IRequest<Model>
        {
            public string Username { get; init; }
            public string Password { get; init; }
        }

        public record Model
        {
            public string Token { get; set; }
            public int UserId { get; init; }
            public string Username { get; init; }
            public string RoleId { get; init; }
        }

        public class Validator : AbstractValidator<Query>
        {
            public Validator()
            {
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        internal class QueryHandler : IRequestHandler<Query, Model>
        {
            private readonly IUserRepository _userRepository;
            private readonly ITokenService _tokenService;
            private readonly IEncryptionService _encryptionService;
            private readonly IMapper _mapper;

            public QueryHandler(IUserRepository repository, ITokenService tokenService, IEncryptionService encryptionService, IMapper mapper)
            {
                _userRepository = repository;
                _tokenService = tokenService;
                _encryptionService = encryptionService;
                _mapper = mapper;
            }

            public async Task<Model> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userRepository.GetUserByUsername(request.Username) ?? throw new Exception("User.Backend.Error.UserNotFound");
                if (!_encryptionService.Verify(request.Password, user.Password))
                    throw new Exception("Invalid login credentials");

                var token = _tokenService.CreateToken(user);
                var model = _mapper.Map<Model>(user);
                model.Token = token;

                return model;
            }
        }
    }
}
