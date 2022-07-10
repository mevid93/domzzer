namespace SlaveAPI.Tests.Services.Tests
{
    using Xunit;
    using SlaveAPI.Services;

    public class AuthenticationManagerTest
    {
        [Fact]
        public void AuthenticationManager_Constructor_Works()
        {
            string username = "TestUser";
            string password = "TestPassword";
            string securityKey = "SuperSecretTestkey123";   
            AuthenticationManager manager = new AuthenticationManager(username, password, securityKey);

            Assert.True(manager is AuthenticationManager);
        }

        [Fact]
        public void Authenticate_AuthenticatesWithValid_Credentials()
        {
            string username = "TestUser";
            string password = "TestPassword";
            string securityKey = "SuperSecretTestkey123";
            AuthenticationManager manager = new AuthenticationManager(username, password, securityKey);

            string token = manager.Authenticate(username, password);

            Assert.False(token == null);
        }

        [Fact]
        public void Authenticate_DoesNotAuthenticate_WithInvalidCredentials()
        {
            string username = "TestUser";
            string password = "TestPassword";
            string securityKey = "SuperSecretTestkey123";
            AuthenticationManager manager = new AuthenticationManager(username, password, securityKey);

            string invalidPassword = "WrongPassword";
            string token = manager.Authenticate(username, invalidPassword);

            Assert.True(token == null);
        }
    }
}
