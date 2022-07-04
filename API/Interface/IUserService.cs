using API.Entities;
using API.Model.User;

namespace API.Interface
{
    public interface IUserService
    {
    AuthenticateResponse Authenticate(AuthenticateRequest model);
    IEnumerable<User> GetAll();
    User GetById(int id);
    void Register(RegisterRequest model);
    void Update(int id, UpdateRequest model);
    void Delete(int id);
    }
}