namespace SlaveAPI.Services
{
    public interface IAuthenticationManager
    {
        string Authenticate(string username, string password);
    }
}