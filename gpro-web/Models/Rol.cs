using System;
using System.Collections.Generic;

namespace gpro_web.Models
{
    public partial class Rol
    {
        public Rol()
        {
            RolOperacion = new HashSet<RolOperacion>();
            Usuario = new HashSet<Usuario>();
        }

        public int Id { get; set; }
        public string Rol1 { get; set; }
        public string Descripcion { get; set; }

        public virtual ICollection<RolOperacion> RolOperacion { get; set; }
        public virtual ICollection<Usuario> Usuario { get; set; }
    }
}
