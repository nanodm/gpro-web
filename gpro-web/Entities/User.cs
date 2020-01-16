namespace gpro_web.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string TipoUsuario { get; set; }
        public int IdEmpleado { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }
}
