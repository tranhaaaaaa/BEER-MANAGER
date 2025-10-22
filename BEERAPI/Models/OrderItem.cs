using System;
using System.Collections.Generic;

namespace BEERAPI.Models;

public partial class Orderitem
{
    public Guid Orderitemuid { get; set; }

    public Guid Orderuid { get; set; }

    public Guid? Productuid { get; set; }

    public string? Name { get; set; }

    public int Quantity { get; set; }
    public decimal? Unitprice { get; set; }

    public virtual Order Orderu { get; set; } = null!;
}
