namespace backend.Service.FileSystem
{
    public class FileSystemService : IFileSystemService
    {
        private readonly IConfiguration _configuration;

        public FileSystemService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Task DeleteFile(string path)
        {
            var basePath = _configuration.GetSection("Songs").GetValue<string>("FolderPath");
            var filePath = Path.Combine(basePath, path);
            if (!File.Exists(filePath))
                throw new Exception($"File {filePath} does not exist");
            File.Delete(filePath);
            return Task.CompletedTask;
        }
    }
}
