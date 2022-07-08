using Microsoft.AspNetCore.Mvc;
using API.Model.User;
using API.Interface;
using API.Entities;
using API.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : ApiController
    {


        private readonly IUserRepository _userRepository;

        public UsersController(
           IUserRepository userRepository)
        {
            _userRepository = userRepository;

        }



        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            var users = await _userRepository.GetAllUserAsync();
            return Ok(users);
        }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<User>> GetById(int id)
        // {
        //     var user = await _userRepository.GetUserByIdAsync(id);
        //     return Ok(user);
        // }

        [HttpGet("{username}")]
        public async Task<ActionResult<User>> GetByUsername(string username)
        {
            return await _userRepository.GetUserByUsernameAsync(username);
        }
        [HttpPut("{id}")]
        public ActionResult Update(int id, UpdateRequest model)
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