namespace SlaveAPI.Controllers
{
    using SlaveAPI.Services;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using SlaveAPI.Models;
    using Microsoft.AspNetCore.Authorization;

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly IAuthenticationManager authenticationManager;

        public LoginController(IConfiguration configuration)
        {
            this.configuration = configuration;
            this.authenticationManager = new AuthenticationManager(
                                                configuration["API_USERNAME"],
                                                configuration["API_PASSWORD"],
                                                configuration["API_SECURITY_KEY"]);
        }

        // POST api/login
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] Credentials credentials)
        {
            var token = authenticationManager.Authenticate(credentials.Username, credentials.Password);

            if (token == null)
            {
                return Unauthorized();
            }

            return Ok(token);
        }
    }
}