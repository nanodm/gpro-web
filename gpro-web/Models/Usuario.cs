using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace gpro_web.Models
{
    public partial class Usuario
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public int IdEmpleado { get; set; }
        public int IdRol { get; set; }

        public virtual Empleado IdEmpleadoNavigation { get; set; }
        public virtual Rol IdRolNavigation { get; set; }
    }
}
