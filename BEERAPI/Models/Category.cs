using System;
using System.Collections.Generic;

namespace BEERAPI.Models;

public partial class Category
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public int Type { get; set; }

    public string? Description { get; set; }
}
