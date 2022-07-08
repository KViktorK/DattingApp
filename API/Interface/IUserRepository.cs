
using API.Entities;
using API.Model.User;

namespace API.Interface
{
    public interface IUserRepository
    {
    Task<IEnumerable<User>> GetAllUserAsync();
    Task<User> GetUserByIdAsync(int id);
    Task<User>GetUserByUsernameAsync(string username);
    Task<bool>SaveAllAsync();
    void Update(int id, UpdateRequest model);
    void Delete(int id);
    }
}