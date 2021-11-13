namespace SlaveAPI.Tests.Controllers.Tests
{
    using Xunit;
    using Microsoft.Extensions.Configuration;
    using SlaveAPI.Controllers;
    using SlaveAPI.Models;
    using Microsoft.AspNetCore.Mvc;
    using System;

    public class LoginControllerTests
    {
        private readonly LoginController loginController;
        private IConfiguration configuration;

        public LoginControllerTests()
        {
            IConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
            // load hardcoded test configurations from appsettings
            configurationBuilder.SetBasePath(AppContext.BaseDirectory);
            configurationBuilder.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
            this.configuration = configurationBuilder.Build();
            this.loginController = new LoginController(configuration);
        }

        [Fact]
        public void LoginController_allows_authentication_with_valid_credentials()
        {
            // Arrange
            var credentials = new Credentials
            {
                Username = this.configuration["API_USERNAME"],
                Password = this.configuration["API_PASSWORD"]
            };

            // Act
            IActionResult response = this.loginController.Login(credentials);
            var okResult = response as OkObjectResult;

            // Assert
            Assert.Equal(200, okResult.StatusCode);
            Assert.True(okResult.Value != null);
        }

        [Fact]
        public void LoginController_does_not_allow_authentication_with_invalid_credentials()
        {
            // Arrange
            var credentials = new Credentials
            {
                Username = this.configuration["API_USERNAME"],
                Password = "WrongPassword"
            };

            // Act
            IActionResult response = this.loginController.Login(credentials);
            var result = response as UnauthorizedResult;

            // Assert
            Assert.Equal(401, result.StatusCode);
        }

        [Fact]
        public void LoginController_does_not_allow_authentication_with_missing_credentials()
        {
            // Arrange
            var credentials = new Credentials
            {
                Username = this.configuration["API_USERNAME"],
            };

            // Act
            IActionResult response = this.loginController.Login(credentials);
            var result = response as UnauthorizedResult;

            // Assert
            Assert.Equal(401, result.StatusCode);
        }
    }
}
