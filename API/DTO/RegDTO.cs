using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class RegDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Password { get; set; }
    }
}