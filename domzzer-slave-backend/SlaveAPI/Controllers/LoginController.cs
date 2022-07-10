using SlaveAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SlaveAPI.Models;
using Microsoft.AspNetCore.Authorization;

namespace SlaveAPI.Controllers
{
    [Authorize]
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IAuthenticationManager _authenticationManager;

        public LoginController(IConfiguration configuration)
        {
            _authenticationManager = new AuthenticationManager(
                                                configuration["API_USERNAME"],
                                                configuration["API_PASSWORD"],
                                                configuration["API_SECURITY_KEY"]);
        }

        // POST api/login
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] Credentials credentials)
        {
            var token = _authenticationManager.Authenticate(credentials.Username ?? string.Empty, 
                credentials.Password ?? string.Empty);

            if (token == null)
            {
                return Unauthorized();
            }

            return Ok(token);
        }
    }
}