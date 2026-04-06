namespace BEERAPI.Models
{
    public class TableOrderFilterDTO
    {
        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public int? Status { get; set; }

        public bool? Today { get; set; } 

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }
    }
}
