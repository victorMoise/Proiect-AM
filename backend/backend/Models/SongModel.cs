namespace backend.Models
{
    public class SongModel
    {
        public int Id { get; init; }
        public string Title { get; init; }
        public string Artist { get; init; }
        public string Genre { get; init; }
        public string Duration { get; init; }
        public bool IsPublic { get; init; }
        public bool IsFavorite { get; set; }
        public int ArtistId { get; init; }
        public int GenreId { get; init; }
    }
}
