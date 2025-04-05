namespace backend.Entities
{
    public class Song
    {
        public int Id { get; init; }
        public string Title { get; init; }
        public int? OwnerId { get; init; }
        public int ArtistId { get; init; }
        public int GenreId { get; init; }
        public bool IsPublic { get; init; }
        public string FilePath { get; init; }
        public int Duration { get; init; } // in seconds

        public User Owner { get; init; }
        public Genre Genre { get; init; }
        public Artist Artist { get; init; }
    }
}
