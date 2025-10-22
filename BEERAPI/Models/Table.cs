using System;
using System.Collections.Generic;

namespace BEERAPI.Models;

public partial class Table
{
    public Guid Tableid { get; set; }

    public string? Name { get; set; }

    public Guid? Orderid { get; set; }
}
