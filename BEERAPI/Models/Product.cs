namespace BEERAPI.Models;

public partial class Product
{
    public Guid ProductUid { get; set; }

    public Guid ShopUid { get; set; }

    public string ProductName { get; set; } = null!;

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public int? Stock { get; set; }

    public int? Type { get; set; }

    public DateTime? CreatedAt { get; set; }

    public decimal? PriceConfig { get; set; }

    public string? Img { get; set; }

    public Guid? Category { get; set; }

    public virtual Shop ShopU { get; set; } = null!;

    public virtual Category? CategoryNavigation { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}