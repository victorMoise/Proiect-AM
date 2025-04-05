namespace backend.Entities
{
    public class City
    {
        public int Id { get; init; }
        public string Code { get; init; }
        public string Name { get; init; }
        public int CountryId { get; init; }
        public Country Country { get; init; }
    }
}
