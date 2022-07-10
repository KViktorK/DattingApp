
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    using BCrypt.Net;
    public class DataSeed
    {
        public static async Task SeedUsers(DBContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<User>>(userData);

            foreach (var user in users)
            {
                user.Username = user.Username.ToLower();
                user.PasswordHash = BCrypt.HashPassword("Password");

                context.Users.Add(user);
            }

            await context.SaveChangesAsync();
        }
    }
}