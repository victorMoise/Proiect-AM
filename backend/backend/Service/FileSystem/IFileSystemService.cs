namespace backend.Service.FileSystem
{
    public interface IFileSystemService
    {
        Task DeleteFile(string path);
    }
}
