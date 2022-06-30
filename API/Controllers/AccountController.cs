using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTO;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : ApiController
    {
        private readonly DBContext _context;

        public AccountController(DBContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(RegDTO regDto)
        {
            if (await UserExists(regDto.Name)) return BadRequest("Username is taken");


            using var h = new HMACSHA512();
            var u = new AppUser

            {
                Name = regDto.Name.ToLower(),
                PasswordH = h.ComputeHash(Encoding.UTF8.GetBytes(regDto.Password)),
                PassworedS = h.Key
            };
            _context.Users.Add(u);
            await _context.SaveChangesAsync();
            return u;

        }
        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(LogDTO logDto)
        {
            var u = await _context.Users
            .SingleOrDefaultAsync(x => x.Name == logDto.Name);

            if (u == null) return Unauthorized("Invalid username");

            using var h = new HMACSHA512(u.PassworedS);

            var computedH = h.ComputeHash(Encoding.UTF8.GetBytes(logDto.Password));

            for (int i = 0; i < computedH.Length; i++)
            {
                if (computedH[i] != u.PasswordH[i]) return Unauthorized("Invalid password");
            }
            return u;
        }
        private async Task<bool> UserExists(string name)
        {
            return await _context.Users.AnyAsync(x => x.Name == name.ToLower());
        }
    }
}