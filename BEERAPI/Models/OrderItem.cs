namespace BEERAPI.Models;

public partial class OrderItem
{
    public Guid OrderItemUid { get; set; }

    public Guid OrderUid { get; set; }

    public Guid ProductUid { get; set; }

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public string? Name { get; set; }

    public virtual Order OrderU { get; set; } = null!;

    public virtual Product ProductU { get; set; } = null!;
}