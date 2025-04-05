using AutoMapper;
using backend.Repository.Generic;
using backend.Repository.User;
using backend.Service.Token;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using E = backend.Entities;

namespace backend.Queries.User
{
    public class SaveUser
    {
        public class Query : IRequest<Model>
        {
            public string Username { get; init; }
            public string Email { get; init; }
            public string? FirstName { get; init; }
            public string? LastName { get; init; }
            public string? PhoneNumber { get; init; }
            public int? Age { get; init; }
        }

        public class Model
        {
            public string Message { get; init; }
        }

        public class Validator : AbstractValidator<Query>
        {
            private readonly int MIN_USERNAME_LENGTH = 3;
            private readonly int MAX_USERNAME_LENGTH = 255;

            public Validator()
            {
                RuleFor(x => x.Username)
                    .NotEmpty()
                    .MinimumLength(MIN_USERNAME_LENGTH)
                    .MaximumLength(MAX_USERNAME_LENGTH);

                RuleFor(x => x.Email)
                    .NotEmpty()
                    .EmailAddress();
            }
        }

        internal class QueryHandler : IRequestHandler<Query, Model>
        {
            private readonly IUserRepository _userRepository;
            private readonly ITokenService _tokenService;
            private readonly IMapper _mapper;
            private readonly IGenericRepository _genericRepository;

            public QueryHandler(IUserRepository userRepository, ITokenService tokenService, IMapper mapper, IGenericRepository genericRepository)
            {
                _userRepository = userRepository;
                _tokenService = tokenService;
                _mapper = mapper;
                _genericRepository = genericRepository;
            }

            public async Task<Model> Handle(Query request, CancellationToken cancellationToken)
            {
                var userId = _tokenService.GetUserId() ?? throw new Exception("Can not extract userId from token");

                var user = await _userRepository.GetUserById(userId);
                if (user == null)
                    throw new Exception("User not found");

                var existingUserWithUsername = await _userRepository.GetUserByUsername(request.Username, false);
                if (existingUserWithUsername != null && existingUserWithUsername.Id != userId)
                    throw new Exception("Username already exists");

                var existingUserWithEmail = await _userRepository.GetUserByEmail(request.Email, false);
                if (existingUserWithEmail != null && existingUserWithEmail.Id != userId)
                    throw new Exception("Email already exists");

                _genericRepository.DetachEntity(user);

                var entity = _mapper.Map<E.User>(request);
                entity.Id = userId;

                await _userRepository.SaveUserDetails(entity);

                return new Model { Message = "User saved successfully" };
            }
        }
    }
}
