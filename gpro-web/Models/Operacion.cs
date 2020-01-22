using System;
using System.Collections.Generic;

namespace gpro_web.Models
{
    public partial class Operacion
    {
        public Operacion()
        {
            RolOperacion = new HashSet<RolOperacion>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public int IdModulo { get; set; }

        public virtual Modulo IdNavigation { get; set; }
        public virtual ICollection<RolOperacion> RolOperacion { get; set; }
    }
}
