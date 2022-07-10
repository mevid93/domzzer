namespace SlaveAPI.Tests.Controllers.Tests
{
    using Xunit;
    using Microsoft.Extensions.Configuration;
    using SlaveAPI.Controllers;
    using SlaveAPI.Models;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.IO;
    using System.Text;

    public class LoginControllerTest
    {
        private readonly LoginController loginController;
        private IConfiguration configuration;

        public LoginControllerTest()
        {
            IConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
            
            // Load hardcoded test configurations from appsettings
            configurationBuilder.SetBasePath(AppContext.BaseDirectory);
            configurationBuilder.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
            this.configuration = configurationBuilder.Build();
            this.loginController = new LoginController(configuration);
        }

        [Fact]
        public void Login_AllowsAuthentication_WithValidCredentials()
        {
            var credentials = new Credentials
            {
                Username = this.configuration["API_USERNAME"],
                Password = this.configuration["API_PASSWORD"]
            };

            IActionResult response = this.loginController.Login(credentials);
            var okResult = response as OkObjectResult;

            Assert.Equal(200, okResult.StatusCode);
            Assert.True(okResult.Value != null);
        }

        [Fact]
        public void Login_DoesNotAllowAuthentication_WithInvalidCredentials()
        {
            var credentials = new Credentials
            {
                Username = this.configuration["API_USERNAME"],
                Password = "WrongPassword"
            };

            IActionResult response = this.loginController.Login(credentials);
            var result = response as UnauthorizedResult;

            Assert.Equal(401, result.StatusCode);
        }

        [Fact]
        public void Login_DoesNotAllowAuthentication_WithMissingCredentials()
        {
            var credentials = new Credentials
            {
                Username = this.configuration["API_USERNAME"],
            };

            IActionResult response = this.loginController.Login(credentials);
            var result = response as UnauthorizedResult;

            Assert.Equal(401, result.StatusCode);
        }

        [Fact]
        public void Login_AllowsAuthentication_WhenCredentialsAreNotRequired()
        {
            IConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
            configurationBuilder.SetBasePath(AppContext.BaseDirectory);
            
            // Appsettings without username and password definitions
            var jsonString = "{\"API_SECURITY_KEY\": \"test_api_security_key\"}";
            configurationBuilder.AddJsonStream(new MemoryStream(Encoding.UTF8.GetBytes(jsonString)));
            var loginController = new LoginController(configurationBuilder.Build());

            var credentials = new Credentials();

            IActionResult response = loginController.Login(credentials);
            var okResult = response as OkObjectResult;

            Assert.Equal(200, okResult.StatusCode);
            Assert.True(okResult.Value != null);
        }
    }
}
