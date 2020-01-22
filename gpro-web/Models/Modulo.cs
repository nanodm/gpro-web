using System;
using System.Collections.Generic;

namespace gpro_web.Models
{
    public partial class Modulo
    {
        public int Id { get; set; }
        public string Nombre { get; set; }

        public virtual Operacion Operacion { get; set; }
    }
}
