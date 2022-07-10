namespace SlaveAPI.Services
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using Microsoft.IdentityModel.Tokens;

    public class AuthenticationManager : IAuthenticationManager
    {
        private readonly string _apiUsername;
        private readonly string _apiPassword;
        private readonly string _apiSecurityKey;

        public AuthenticationManager(string apiUsername, string apiPassword, string apiSecurityKey)
        {
            _apiUsername = apiUsername ?? string.Empty;
            _apiPassword = apiPassword ?? string.Empty;
            _apiSecurityKey = apiSecurityKey;
        }

        public string Authenticate(string username, string password)
        {
            if ((_apiUsername != string.Empty && _apiUsername != username) ||
                (_apiPassword != string.Empty && _apiPassword != password))
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(_apiSecurityKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.Name, username)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), 
                                                            SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}