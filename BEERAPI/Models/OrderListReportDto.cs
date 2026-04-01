namespace BEERAPI.Models
{
    public class OrderListReportDto
    {
        public Guid OrderUid { get; set; }
        public string? Name { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public int Status { get; set; }
        public string StatusName
        {
            get
            {
                return Status switch
                {
                    0 => "Chờ thanh toán",
                    1 => "Đã thanh toán",
                    2 => "Đã hủy",
                    _ => "Không xác định"
                };
            }
        }
        public int PaymentType { get; set; }
        public string PaymentTypeName
        {
            get
            {
                return PaymentType switch
                {
                    -1 => "Ký nợ",
                    0 => "Chuyển khoản",
                    1 => "Tiền mặt",
                    _ => "Không xác định"
                };
            }
        }
        public Guid ShopUid { get; set; }
        public Guid Type { get; set; }
        public string? TypeName { get; set; }
    }
}
