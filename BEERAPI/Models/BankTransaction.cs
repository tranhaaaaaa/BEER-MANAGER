using System;
using System.Collections.Generic;

namespace BEERAPI.Models;

public partial class BankTransaction
{
    public long Id { get; set; }

    public string? Gateway { get; set; }

    public DateTime? TransactionDate { get; set; }

    public string? AccountNumber { get; set; }

    public string? SubAccount { get; set; }

    public string? TransferType { get; set; }

    public decimal? TransferAmount { get; set; }

    public string? Content { get; set; }

    public string? Description { get; set; }

    public string? ReferenceCode { get; set; }

    public decimal? Accumulated { get; set; }

    public string? RawJson { get; set; }

    public int? Status { get; set; }

    public Guid? OrderId { get; set; }

    public string? ExtractedOrderCode { get; set; }

    public DateTime? CreatedAt { get; set; }
}
