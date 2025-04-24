namespace backend.Service.FileSystem
{
    public class FileSystemService : IFileSystemService
    {
        private readonly IConfiguration _configuration;

        public FileSystemService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SaveFileAsync(IFormFile file, string title, string artist, string songsFolderPath)
        {
            if (file == null || file.Length == 0)
                throw new Exception("Invalid file.");

            var rootPath = Path.GetFullPath(songsFolderPath);
            var artistFolder = artist.ToLower();
            var artistPath = Path.Combine(rootPath, artistFolder);

            if (!Directory.Exists(artistPath))
                Directory.CreateDirectory(artistPath);

            var extension = Path.GetExtension(file.FileName);
            var fileName = title ;
            if (!title.EndsWith(".mp3"))
                fileName = fileName + ".mp3";
            var fullPath = Path.Combine(artistPath, fileName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
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
