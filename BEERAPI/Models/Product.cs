using System;
using System.Collections.Generic;

namespace BEERAPI.Models;

public partial class Product
{
    public Guid Productuid { get; set; }

    public string? Productname { get; set; }

    public string? Description { get; set; }

    public string? Img { get; set; }

    public decimal? Price { get; set; }

    public decimal? Priceconfig { get; set; }

    public int? Stock { get; set; }

    public int? Type { get; set; }

    public DateTime? Createdat { get; set; }

    public Guid Shopuid { get; set; }

    public virtual Shop Shopu { get; set; } = null!;
}
