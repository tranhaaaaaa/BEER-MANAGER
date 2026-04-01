namespace BEERAPI.Models
{
    public class CreateUserDTO
    {
        public string Name { get; set; }

        public string? Phone { get; set; }

        public string? Address { get; set; }

        public Guid? ShopUID { get; set; }
    }
}
