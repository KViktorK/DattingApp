using System.ComponentModel.DataAnnotations;

namespace API.Model.User
{
    public class AuthenticateRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

    }
}