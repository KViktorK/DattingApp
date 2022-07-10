using API.Authorization;
using API.Data;
using API.Entities;
using API.Helpers;
using API.Model.User;
using AutoMapper;

namespace API.Services
{
    using API.Interface;
    using BCrypt.Net;
    public class AuthService: IAuthService
    {
        private DBContext _context;
        private IJwtUtils _jwtUtils;
        private readonly IMapper _mapper;
        public AuthService(DBContext context,
        IJwtUtils jwtUtils,
        IMapper mapper)
        {
            _context = context;
            _jwtUtils = jwtUtils;
            _mapper = mapper;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _context.Users.SingleOrDefault(x => x.Username == model.Username);

            // validate
            if (user == null || !BCrypt.Verify(model.Password, user.PasswordHash))
                throw new AppException("Username or password is incorrect");

            // authentication successful
            var response = _mapper.Map<AuthenticateResponse>(user);
            response.Token = _jwtUtils.GenerateToken(user);
            return response;
        }
        public void Register(RegisterRequest model)
        {
            // validate
            if (_context.Users.Any(x => x.Username == model.Username))
                throw new AppException("Username '" + model.Username + "' is already taken");

            // map model to new user object
            var user = _mapper.Map<User>(model);

            // hash password
            user.PasswordHash = BCrypt.HashPassword(model.Password);

            // save user
            _context.Users.Add(user);
            _context.SaveChanges();
        }
    }
}