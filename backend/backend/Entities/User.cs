namespace backend.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; init; }
        public string Email { get; init; }
        public string Password { get; set; }
        public string? FirstName { get; init; }
        public string? LastName { get; init; }
        public string? PhoneNumber { get; init; }
        public int? Age { get; init; }
        public int? AddressId { get; set; }
        public int RoleId { get; set; }
        public Address Address { get; set; }
        public Role Role { get; init; }
    }
}
