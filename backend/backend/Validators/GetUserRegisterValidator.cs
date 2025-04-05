using backend.Queries.Auth;
using backend.Repository.User;
using FluentValidation;

namespace backend.Validators
{
    public class GetUserRegisterValidator : AbstractValidator<GetUserRegister.Query>
    {
        private readonly IUserRepository _userRepository;

        private readonly int MIN_USERNAME_LENGTH = 3;
        private readonly int MIN_PASSWORD_LENGTH = 8;
        private readonly int MAX_USERNAME_LENGTH = 255;
        private readonly int MAX_PASSWORD_LENGTH = 255;

        public GetUserRegisterValidator(IUserRepository userRepository)
        {
            _userRepository = userRepository;

            RuleFor(x => x.Username)
                .NotEmpty()
                .MinimumLength(MIN_USERNAME_LENGTH)
                .MaximumLength(MAX_USERNAME_LENGTH)
                .Must(BeUniqueUsername)
                .WithMessage("This username is already taken");

            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress()
                .Must(BeUniqueEmail)
                .WithMessage("This email address is already taken");

            RuleFor(x => x.Password)
                .NotEmpty()
                .MinimumLength(MIN_PASSWORD_LENGTH)
                .MaximumLength(MAX_PASSWORD_LENGTH);
        }

        private bool BeUniqueUsername(string username)
        {
            var user = _userRepository.GetUserByUsername(username).Result;
            return user == null;
        }

        private bool BeUniqueEmail(string email)
        {
            var user = _userRepository.GetUserByEmail(email).Result;
            return user == null;
        }
    }
}
