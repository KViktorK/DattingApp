using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Model.User;
using AutoMapper;
namespace API.Helpers;

public class AutoProfileMapper : Profile
{
    public AutoProfileMapper()
    {
        // User -> AuthenticateResponse
        CreateMap<User, AuthenticateResponse>();
        // RegisterRequest -> User
        CreateMap<RegisterRequest, User>();
        CreateMap<User, MemberDto>()
        .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
        .ForMember(dest=>dest.Age,opt=>opt.MapFrom(src=>src.DateOfBirth.CalculateAge()));
        CreateMap<Photo, PhotoDto>();

        // UpdateRequest -> User

        CreateMap<UpdateRequest, User>()
            .ForAllMembers(x => x.Condition(
                (src, dest, prop) =>
                {
                    // ignore null & empty string properties
                    if (prop == null) return false;
                    if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

                    return true;
                }
            ));
    }
}
