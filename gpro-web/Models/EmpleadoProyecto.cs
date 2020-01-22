using System;
using System.Collections.Generic;

namespace gpro_web.Models
{
    public partial class EmpleadoProyecto
    {
        public int IdEmpleado { get; set; }
        public int IdProyecto { get; set; }

        public virtual Empleado IdEmpleadoNavigation { get; set; }
        public virtual Proyecto IdProyectoNavigation { get; set; }
    }
}
