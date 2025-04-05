namespace backend.Entities
{
    public class Address
    {
        public int Id { get; init; }
        public string? Street { get; set; }
        public string? Details { get; set; }
        public int CityId { get; set; }
        public City City { get; init; }
    }
}
