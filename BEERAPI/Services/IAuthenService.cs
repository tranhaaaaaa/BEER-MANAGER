namespace BEERAPI.Services
{
    public interface IAuthenService
    {
        public object Login(string username, string password);
        public object Register(string username, string password);


    }
}
