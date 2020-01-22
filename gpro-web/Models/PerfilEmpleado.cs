using System;
using System.Collections.Generic;

namespace gpro_web.Models
{
    public partial class PerfilEmpleado
    {
        public PerfilEmpleado()
        {
            Tarea = new HashSet<Tarea>();
        }

        public int PerfilEmpleadoIdPerfil { get; set; }
        public int PerfilEmpleadoIdEmpleado { get; set; }

        public virtual Empleado PerfilEmpleadoIdEmpleadoNavigation { get; set; }
        public virtual Perfil PerfilEmpleadoIdPerfilNavigation { get; set; }
        public virtual ICollection<Tarea> Tarea { get; set; }
    }
}
