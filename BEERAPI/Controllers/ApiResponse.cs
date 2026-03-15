namespace BEERAPI.Controllers
{
    public class ApiResponse<T>
    {
        public int Status { get; set; }
        public bool IsSuccess { get; set; }
        public T Data { get; set; }
        public string? Message { get; set; }
    }
}
