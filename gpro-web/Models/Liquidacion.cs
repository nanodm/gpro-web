using System;
using System.Collections.Generic;

namespace gpro_web.Models
{
    public partial class Liquidacion
    {
        public int Id { get; set; }
        public string Estado { get; set; }
        public int IdEmpleado { get; set; }

        public virtual Empleado IdEmpleadoNavigation { get; set; }
    }
}
