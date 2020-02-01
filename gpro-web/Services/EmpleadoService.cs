using gpro_web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gpro_web.Services
{

    public interface IEmpleadoService
    {
        List<Empleado> AllEmpleados();
        Empleado BuscarPorDni(int dni);        
    }

    public class EmpleadoService : IEmpleadoService
    {
        private gpro_dbContext _context;

        public EmpleadoService(gpro_dbContext context)
        {
            _context = context;
        }

        public List<Empleado> AllEmpleados()
        {
            var empleados = from e in _context.Empleado select e;

            if (empleados.ToList().Count() == 0)
            {
                return null;
            }

            return empleados.ToList();
        }

        public Empleado BuscarPorDni(int dni)
        {
            var empleado = from e in _context.Empleado
                           where e.Dni.Equals(dni)
                           select e;

            if (empleado.ToList().Count() == 0)
            {
                return null;
            }

            return empleado.ToList().ElementAt(0);
        }
    }

}
