using System;
using System.Collections.Generic;

namespace BEERAPI.Models;

public partial class User
{
    public Guid Uid { get; set; }

    public string? Name { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public DateTime? Createdat { get; set; }

    public Guid Shopuid { get; set; }

    public virtual ICollection<Logging> Loggings { get; set; } = new List<Logging>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual Shop Shopu { get; set; } = null!;
}
