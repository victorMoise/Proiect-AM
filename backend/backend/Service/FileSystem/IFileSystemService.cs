namespace backend.Service.FileSystem
{
    public interface IFileSystemService
    {
        Task SaveFileAsync(IFormFile file, string title, string artist, string songsFolderPath);
        Task DeleteFile(string path);
        Task DeleteFolder(string path);
    }
}
