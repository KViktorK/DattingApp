
using API.DTOs;
using API.Entities;
using API.Model.User;

namespace API.Interface
{
    public interface IUserRepository
    {
    User GetUserByIdAsync(int id);
    Task<User>GetUserByUsernameAsync(string username);
    Task<bool>SaveAllAsync();
    IEnumerable<MemberDto> GetMembers();
    Task<MemberDto> GetMemberAsync(string username);
    void Update(int id, UpdateRequest model);
    void Delete(int id);
    }
}