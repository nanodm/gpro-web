using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using gpro_web.Models;


namespace gpro_web.Services
{
    public interface IUsuarioService
{
        Usuario Authenticate(string username, string password);
        IEnumerable<Usuario> GetAll();
        Usuario GetById(int id);
}
    public class UsuarioService : IUsuarioService
{
        private gpro_dbContext _context;

        public UsuarioService(gpro_dbContext context)
        {
            _context = context;
        }

        public Usuario Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Usuario.SingleOrDefault(x => x.Username == username && x.Password == password);

            // return null if user not found
            if (user == null)
                return null;
           
            // remove password before returning
            //user.Password = null;

            return user;
        }

        public IEnumerable<Usuario> GetAll()
        {
            return _context.Usuario;
        }

        public Usuario GetById(int id)
        {
            return _context.Usuario.Find(id);
        }
    }
}
    