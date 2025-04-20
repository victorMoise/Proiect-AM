namespace backend.Entities
{
    public class Song
    {
        public int Id { get; init; }
        public string Title { get; set; }
        public int? OwnerId { get; init; }
        public int ArtistId { get; set; }
        public int GenreId { get; set; }
        public bool IsPublic { get; set; }
        public string FilePath { get; init; }
        public int Duration { get; init; } // in seconds

        public User Owner { get; init; }
        public Genre Genre { get; init; }
        public Artist Artist { get; init; }
    }
}
