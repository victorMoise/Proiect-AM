namespace backend.Service.Encryption
{
    public class EncryptionService : IEncryptionService
    {
        public string Encrypt(string text)
        {
            return BCrypt.Net.BCrypt.HashPassword(text);
        }

        public bool Verify(string text, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(text, hash);
        }
    }
}
