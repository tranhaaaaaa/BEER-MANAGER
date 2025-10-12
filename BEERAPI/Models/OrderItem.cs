using System;
using System.Collections.Generic;

namespace BEERAPI.Models;

public partial class OrderItem
{
    public Guid OrderItemUid { get; set; }

    public Guid OrderUid { get; set; }

    public Guid ProductUid { get; set; }

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public decimal? Name { get; set; }

    public virtual Order OrderU { get; set; } = null!;
}
