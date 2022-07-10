using Microsoft.AspNetCore.Mvc;
using API.Model.User;
using API.Interface;
using API.DTOs;
using AutoMapper;
using API.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : ApiController
    {


        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(
           IUserRepository userRepository,
           IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;

        }

        [HttpGet]
        public ActionResult<IEnumerable<MemberDto>> GetAllUsers()
        {
            var users = _userRepository.GetMembers();
            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetByUsername(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequest model)
        {
            _userRepository.Update(id, model);
            return Ok(new { message = "User updated successfully" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userRepository.Delete(id);
            return Ok(new { message = "User deleted successfully" });
        }

    }
}