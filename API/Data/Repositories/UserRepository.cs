using API.Entities;
using API.Helpers;
using API.Interface;
using API.Model.User;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{
    using API.Authorization;
    using AutoMapper;
    using BCrypt.Net;
    public class UserRepository : IUserRepository
    {
        private readonly DBContext _context;

        private IJwtUtils _jwtUtils;
        private readonly IMapper _mapper;


        public UserRepository(DBContext context,
        IJwtUtils jwtUtils,
        IMapper mapper)
        {
            _context = context;
            _jwtUtils = jwtUtils;
            _mapper = mapper;
        }

        public async void Delete(int id)
        {
            var user = await GetUserByIdAsync(id);
            _context.Users.Remove(user);
            await SaveAllAsync();
        }

        public async Task<IEnumerable<User>> GetAllUserAsync()
        {
            return await _context.Users
            .Include(p=>p.Photos)
            .ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
            .Include(p=>p.Photos)
            .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async void Update(int id, UpdateRequest model)
        {
            var user = await GetUserByIdAsync(id);

            // validate
            if (model.Username != user.UserName && _context.Users.Any(x => x.UserName == model.Username))
                throw new AppException("Username '" + model.Username + "' is already taken");


            if (!string.IsNullOrEmpty(model.Password))
                user.PasswordHash = BCrypt.HashPassword(model.Password);

            _mapper.Map(model, user);
            _context.Users.Update(user);
            await SaveAllAsync();
        }
    }
}