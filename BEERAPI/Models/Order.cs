using System;
using System.Collections.Generic;

namespace BEERAPI.Models;

public partial class Order
{
    public Guid Orderuid { get; set; }

    public string? Name { get; set; }

    public string? Type { get; set; }

    public decimal? Totalamount { get; set; }

    public DateTime? Orderdate { get; set; }

    public Guid Shopuid { get; set; }

    public Guid Useruid { get; set; }

    public virtual ICollection<Orderitem> Orderitems { get; set; } = new List<Orderitem>();

    public virtual Shop Shopu { get; set; } = null!;

    public virtual User Useru { get; set; } = null!;
}
