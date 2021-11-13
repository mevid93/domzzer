namespace SlaveAPI.Tests
{
    using Xunit;
    using SlaveAPI.Services;

    public class AuthenticationManagerTests
    {
        [Fact]
        public void AuthenticationManager_constructor_works()
        {
            // Arrange
            string username = "TestUser";
            string password = "TestPassword";
            string securityKey = "SuperSecretTestkey123";
            AuthenticationManager manager = new AuthenticationManager(username, password, securityKey);

            // Assert
            Assert.True(manager is AuthenticationManager);
        }

        [Fact]
        public void AuthenticationManager_authenticates_with_valid_credentials()
        {
            // Arrange
            string username = "TestUser";
            string password = "TestPassword";
            string securityKey = "SuperSecretTestkey123";
            AuthenticationManager manager = new AuthenticationManager(username, password, securityKey);

            // Act
            string token = manager.Authenticate(username, password);

            // Assert
            Assert.False(token == null);
        }

        [Fact]
        public void AuthenticationManager_does_not_authenticate_with_invalid_credentials()
        {
            // Arrange
            string username = "TestUser";
            string password = "TestPassword";
            string securityKey = "SuperSecretTestkey123";
            AuthenticationManager manager = new AuthenticationManager(username, password, securityKey);

            // Act
            string invalidPassword = "WrongPassword";
            string token = manager.Authenticate(username, invalidPassword);

            // Assert
            Assert.True(token == null);
        }
    }
}
