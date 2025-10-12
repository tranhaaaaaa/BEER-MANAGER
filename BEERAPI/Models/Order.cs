using System;
using System.Collections.Generic;

namespace BEERAPI.Models;

public partial class Order
{
    public Guid OrderUid { get; set; }

    public Guid UserUid { get; set; }

    public DateTime? OrderDate { get; set; }

    public int Status { get; set; }

    public decimal? TotalAmount { get; set; }

    public int PaymentType { get; set; }

    public Guid ShopUid { get; set; }

    public string Name { get; set; } = null!;

    public string? Type { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual Shop ShopU { get; set; } = null!;

    public virtual User UserU { get; set; } = null!;
}
