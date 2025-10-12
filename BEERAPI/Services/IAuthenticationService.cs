namespace BEERAPI.Services
{
    public interface IAuthenticationService
    {
        public object Login(string username, string password);

    }
}
