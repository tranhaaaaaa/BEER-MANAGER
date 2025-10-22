using System;
using System.Collections.Generic;

namespace BEERAPI.Models;

public partial class Shop
{
    public Guid Shopuid { get; set; }

    public string? Shopname { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public string? Img { get; set; }

    public DateTime? Createdat { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
