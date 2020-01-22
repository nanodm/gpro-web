using gpro_web.Models;

namespace gpro_web.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int IdEmpleado { get; set; }
        public int IdRol { get; set; }

    }
}

