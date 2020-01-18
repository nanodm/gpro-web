using AutoMapper;
using gpro_web.Dtos;
using gpro_web.Models;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Usuario, UserDto>();
            CreateMap<UserDto, Usuario>();
        }
    }
}