namespace backend.Service.FileSystem
{
    public class FileSystemService : IFileSystemService
    {
        private readonly IConfiguration _configuration;

        public FileSystemService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task DeleteFile(string path)
        {
            var basePath = _configuration.GetSection("Songs").GetValue<string>("FolderPath");
            var filePath = Path.Combine(basePath, path);
            var directoryPath = Path.GetDirectoryName(filePath);
            if (!File.Exists(filePath))
                throw new Exception($"File {filePath} does not exist");
            await Task.Run(() => File.Delete(filePath));
            await DeleteFolder(directoryPath);
        }

        public Task DeleteFolder(string path)
        {
            if (string.IsNullOrWhiteSpace(path) || !Directory.Exists(path))
                return Task.CompletedTask;

            var isEmpty = !Directory.EnumerateFileSystemEntries(path).Any();
            if (isEmpty)
                Directory.Delete(path, false);

            return Task.CompletedTask;
        }
    }
}
