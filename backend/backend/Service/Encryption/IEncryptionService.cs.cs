namespace backend.Service.Encryption
{
    public interface IEncryptionService
    {
        string Encrypt(string text);
        bool Verify(string text, string hash);
    }
}
