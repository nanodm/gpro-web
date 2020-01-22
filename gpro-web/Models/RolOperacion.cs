using System;
using System.Collections.Generic;

namespace gpro_web.Models
{
    public partial class RolOperacion
    {
        public int Id { get; set; }
        public int IdRol { get; set; }
        public int IdOperacion { get; set; }

        public virtual Operacion IdOperacionNavigation { get; set; }
        public virtual Rol IdRolNavigation { get; set; }
    }
}
