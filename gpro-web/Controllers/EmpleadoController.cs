using AutoMapper;
using gpro_web.Helpers;
using gpro_web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gpro_web.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("[controller]")]
    public class EmpleadoController : ControllerBase
    {
        private IEmpleadoService _empleadoService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public EmpleadoController(
            IEmpleadoService empleadoService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _empleadoService = empleadoService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [Authorize(Roles = "Admin, PM")]
        [HttpGet("empleados")]
        public IActionResult AllEmpleados()
        {
            var empleados = _empleadoService.AllEmpleados();

            if (empleados == null)
                return NotFound();
            {
            }

            return Ok(empleados);
        }

        [Authorize(Roles = "Admin, PM")]
        [HttpGet("empleados/{dato}")]
        public IActionResult BuscarEmpleado(string dato)
        {
            var empleado = _empleadoService.BuscarEmpleados(dato);

            if (empleado == null)
            {
                return NotFound();
            }

            return Ok(empleado);
        }

        [Authorize(Roles = "Admin, PM")]
        [HttpGet("documento/{dni}")]
        public IActionResult BuscarPorDni(int dni)
        {
            var empleado = _empleadoService.BuscarPorDni(dni);

            if(empleado == null)
            {
                return NotFound();
            }

            return Ok(empleado);
        }
    }
}
