namespace SlaveAPI.Services
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using Microsoft.IdentityModel.Tokens;

    public class AuthenticationManager : IAuthenticationManager
    {
        private readonly string apiUsername;
        private readonly string apiPassword;
        private readonly string apiSecurityKey;

        public AuthenticationManager(string apiUsername, string apiPassword, string apiSecurityKey)
        {
            this.apiUsername = apiUsername != null ? apiUsername : string.Empty;
            this.apiPassword = apiPassword != null ? apiUsername : string.Empty;
            this.apiSecurityKey = apiSecurityKey;
        }

        public string Authenticate(string username, string password)
        {
            if ((this.apiUsername != string.Empty && this.apiUsername != username) ||
                (this.apiPassword != string.Empty && this.apiPassword != password))
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(this.apiSecurityKey);
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