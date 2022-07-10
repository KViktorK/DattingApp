using API.Entities;
using API.Helpers;
using API.Interface;
using API.Model.User;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{
    using API.Authorization;
    using API.DTOs;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using BCrypt.Net;
    public class UserRepository : IUserRepository
    {
        private readonly DBContext _context;

        private IJwtUtils _jwtUtils;
        private readonly IMapper _mapper;


        public UserRepository(
        DBContext context,
        IJwtUtils jwtUtils,
        IMapper mapper)
        {
            _context = context;
            _jwtUtils = jwtUtils;
            _mapper = mapper;
        }

        public async void Delete(int id)
        {
            var user = GetUserByIdAsync(id);
            _context.Users.Remove(user);
            await SaveAllAsync();
        }

        public IEnumerable<User> GetAllUserAsync()
        {
            return _context.Users
            .Include(p=>p.Photos)
            .ToList();
        }

        public  User GetUserByIdAsync(int id)
        {
            return  _context.Users.Find(id);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
            .Include(p=>p.Photos)
            .SingleOrDefaultAsync(x => x.Username == username);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async void Update(int id, UpdateRequest model)
        {
            var user = GetUserByIdAsync(id);

            // validate
            if (model.Username != user.Username && _context.Users.Any(x => x.Username == model.Username))
                throw new AppException("Username '" + model.Username + "' is already taken");


            if (!string.IsNullOrEmpty(model.Password))
                user.PasswordHash = BCrypt.HashPassword(model.Password);

            _mapper.Map(model, user);
            _context.Users.Update(user);
            await SaveAllAsync();
        }

        public IEnumerable<MemberDto> GetMembers()
        {
            return _context.Users
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .ToList();
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
            .Where(x=>x.Username== username)
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }
    }
}