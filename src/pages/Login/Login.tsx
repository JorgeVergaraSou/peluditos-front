import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { createUser } from '../../redux/states/user';
import { loginService } from '../../services/auth.service';
import { getRoleRoute } from '../../utilities';
import { PublicRoutes, Roles } from '../../models';

function Login() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailInput || !passwordInput) {
      return setError('Todos los campos son obligatorios');
    }
    setLoading(true);
    setError('');
    try {
      const { token, email, role, name, idUser } = await loginService(emailInput, passwordInput);

      dispatch(createUser({ email, role, token, name, idUser }));

      const roleRoute = getRoleRoute(role as Roles);

      // Obtener la ruta de redirección de la query string
      const query = new URLSearchParams(location.search);
      const redirectPath = query.get('redirect') || roleRoute;

      navigate(redirectPath, { replace: true });
      
    } catch (error: any) {
      setError(error.message); // Mostrar el mensaje de error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col text-center">
      <div className="grid grid-cols-3 gap-4 pt-10 ">

        <div className=" h-full w-full "></div>

        <div className=" h-full w-full bg-slate-300 bg-opacity-50 rounded-lg">      
          <h2 className='text-3xl text-black '>LOGIN</h2>
          <form onSubmit={handleLogin} className='font-sans space-y-4 w-full max-w-lg'>
            <div>
              <label htmlFor='email' className='block text-black text-md font-bold mb-2'>
                Correo electrónico
              </label>
              <input
                name='email'
                id='email'
                className='form-control shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center'
                type='text'
                placeholder='email@email.com'
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <label htmlFor='password' className='block text-black text-md font-bold mb-2'>
                Contraseña
              </label>
              <input
                name='password'
                id='password'
                className='form-control shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center'
                type='password'
                placeholder='******'
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-5' type="submit" disabled={loading}>Entrar</button>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => navigate(`/${PublicRoutes.REGISTER}`)}>Registrarse</button>

            {error && <p className='text-red-600 mt-4'>{error}</p>} {/* Mostrar el error */}
          </form>
        </div>
      </div>

      <div className=" h-full w-full"></div>

    </div>
  );
}

export default Login;

/*import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import { PrivateRoutes, PublicRoutes, Roles } from '../../models';
import { createUser } from '../../redux/states/user';
import { loginService } from '../../services/auth.service';
import { getRoleRoute } from '../../utilities';
import { PublicRoutes, Roles } from '../../models';

function Login() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailInput || !passwordInput) {
      return setError('Todos los campos son obligatorios');
    }
    setLoading(true);
    setError('');
    try {
      const { token, email, role, name } = await loginService(emailInput, passwordInput);

      dispatch(createUser({ email, role, token, name }));
      //localStorage.setItem('token', token);

      const roleRoute = getRoleRoute(role as Roles);
  
          
      navigate(roleRoute, { replace: true });
      
    } catch (error: any) {
      setError(error.message); // Mostrar el mensaje de error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col text-center">
      <div className="grid grid-cols-3 gap-4 pt-10 ">

        <div className=" h-full w-full "></div>

        <div className=" h-full w-full bg-slate-300 bg-opacity-50 rounded-lg">      
          <h2 className='text-3xl text-black '>LOGIN</h2>
          <form onSubmit={handleLogin} className='font-sans space-y-4 w-full max-w-lg'>
            <div>
              <label htmlFor='email' className='block text-black text-md font-bold mb-2'>
                Correo electrónico
              </label>
              <input
                name='email'
                id='email'
                className='form-control shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center'
                type='text'
                placeholder='email@email.com'
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <label htmlFor='password' className='block text-black text-md font-bold mb-2'>
                Contraseña
              </label>
              <input
                name='password'
                id='password'
                className='form-control shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center'
                type='password'
                placeholder='******'
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-5' type="submit" disabled={loading}>Entrar</button>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => navigate(`/${PublicRoutes.REGISTER}`)}>Registrarse</button>

            {error && <p className='text-red-600 mt-4'>{error}</p>} }
          </form>
        </div>
      </div>

      <div className=" h-full w-full"></div>

    </div>

  );
}
export default Login;*/