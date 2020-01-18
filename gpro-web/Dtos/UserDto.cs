namespace gpro_web.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string TipoUsuario { get; set; }
        public int IdEmpleado { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
