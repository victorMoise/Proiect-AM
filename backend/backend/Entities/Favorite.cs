namespace backend.Entities
{
    public class Favorite
    {
        public int Id { get; init; }
        public int UserId { get; init; }
        public int SongId { get; init; }

        public User User { get; init; }
        public Song Song { get; init; }
    }
}
