namespace backend.Service.Token
{
    public interface ITokenService
    {
        string CreateToken(Entities.User user);
        int? GetUserId();
        string? GetUsername();
        string? GetEmail();
        string? GetRole();
    }
}
