namespace BEERAPI.Models
{
    public class OrderItemsResponseDTO
    {
        public Guid OrderUid { get; set; }
        public Guid? Type { get; set; }

        public string OrderName { get; set; }
        public decimal? TotalAmount { get; set; }
        public List<OrderItem> Items { get; set; }
    }
}
