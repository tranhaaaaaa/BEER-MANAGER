using System;
using System.Collections.Generic;

namespace BEERAPI.Models;

public partial class Table
{
    public Guid TableId { get; set; }

    public string? Name { get; set; }

    public Guid? OrderId { get; set; }

    public int? Status { get; set; }
}
