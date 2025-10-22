using System;
using System.Collections.Generic;

namespace BEERAPI.Models;

public partial class Logging
{
    public Guid Loguid { get; set; }

    public string? Action { get; set; }

    public string? Level { get; set; }

    public string? Tablename { get; set; }

    public Guid? Recorduid { get; set; }

    public Guid? Useruid { get; set; }

    public DateTime? Createdat { get; set; }

    public virtual User? Useru { get; set; }
}
