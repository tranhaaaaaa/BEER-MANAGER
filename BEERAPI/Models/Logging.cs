using System;
using System.Collections.Generic;

namespace BEERAPI.Models;

public partial class Logging
{
    public Guid LogUid { get; set; }

    public Guid? UserUid { get; set; }

    public string Action { get; set; } = null!;

    public string? TableName { get; set; }

    public string? Level { get; set; }

    public Guid? RecordUid { get; set; }

    public string? Message { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual User? UserU { get; set; }
}
