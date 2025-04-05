using AutoMapper;
using backend.Repository.User;
using backend.Service.Token;
using FluentValidation;
using MediatR;
using E = backend.Entities;

namespace backend.Queries.User
{
    public class SaveUserAddress
    {
        public class Query : IRequest<Model>
        {
            public int CityId { get; init; }
            public int CountryId { get; init; }
            public string? Street { get; init; }
            public string? Details { get; init; }
        }

        public class Model
        {
            public string Message { get; init; }
        }

        public class Validator : AbstractValidator<Query>
        {
            public Validator()
            {
                RuleFor(x => x.CityId).NotEmpty();
                RuleFor(x => x.CountryId).NotEmpty();
            }
        }

        internal class QueryHandler : IRequestHandler<Query, Model>
        {
            private readonly IUserRepository _userRepository;
            private readonly ITokenService _tokenService;
            private readonly IMapper _mapper;

            public QueryHandler(IUserRepository userRepository, ITokenService tokenService, IMapper mapper)
            {
                _userRepository = userRepository;
                _tokenService = tokenService;
                _mapper = mapper;
            }

            public async Task<Model> Handle(Query request, CancellationToken cancellationToken)
            {
                var userId = _tokenService.GetUserId() ?? throw new Exception("Can not extract userId from token");
                var user = await _userRepository.GetUserById(userId) ?? throw new Exception("User not found");
                var address = _mapper.Map<E.Address>(request);
                await _userRepository.SaveAddress(user, address);
                return new Model { Message = "User address saved" };
            }
        }
    }
}
