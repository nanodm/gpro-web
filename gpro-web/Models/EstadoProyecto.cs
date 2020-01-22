using System;
using System.Collections.Generic;

namespace gpro_web.Models
{
    public partial class EstadoProyecto
    {
        public EstadoProyecto()
        {
            Proyecto = new HashSet<Proyecto>();
        }

        public string EstadoProyecto1 { get; set; }

        public virtual ICollection<Proyecto> Proyecto { get; set; }
    }
}
