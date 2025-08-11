import { useState } from "react";
//import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { createUser } from "../../redux/states/user";
import { registerService } from "../../services/register.service";
import { PublicRoutes } from "../../models";
//import { getRoleRoute } from "../../utilities";
//import { DecodedToken } from "../../interfaces/decode.token.interface";
//import { Roles } from "../../models";


function RegisterPage() {

  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [secretWord, setSecretWordInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordRepeatInput, setPasswordRepeatInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  //const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailInput || !passwordInput || !nameInput || !secretWord) {
      return setError('Todos los campos son obligatorios');
    }
    if (passwordInput !== passwordRepeatInput) {
      return setError('Las contraseñas no coinciden');
    }
    setLoading(true);
    setError('');
    try {
      const response = await registerService(nameInput, emailInput, passwordInput, secretWord);
     
      alert(response.message); 
      if (response.success) {
        alert(response.message);

        navigate(`/${PublicRoutes.LOGIN}`);
      } else {
        alert(response.message);
      }

    } catch (error: any) {
    
      alert(error.message); 
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col text-center">
      <div className="grid grid-cols-3 gap-4 pt-10 ">
        <div className="h-full w-full "></div>
        <div className="h-full w-full bg-slate-300 bg-opacity-50 rounded-lg shadow-2xl">
          <h2 className='text-3xl text-black '>Registrarse</h2>
          <form onSubmit={handleRegister} className='font-sans space-y-4 w-full max-w-lg'>
            <div>
              <label htmlFor='name' className='block text-black text-md font-bold mb-2'>Nombre</label>
              <input
                name='name'
                id='name'
                className='form-control shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center'
                type='text'
                placeholder='John'
                onChange={(e) => setNameInput(e.target.value)}
              />
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
              <label htmlFor='secretWord' className='block text-black text-md font-bold mb-2'>
                Palabra secreta
              </label>
              <input
                name='secretWord'
                id='secretWord'
                className='form-control shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center'
                type='password'
                placeholder='******'
                onChange={(e) => setSecretWordInput(e.target.value)}
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
              <label htmlFor='passwordRepeat' className='block text-black text-md font-bold mb-2'>
                Repite la contraseña
              </label>
              <input
                name='passwordRepeat'
                id='passwordRepeat'
                className='form-control shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center'
                type='password'
                placeholder='******'
                onChange={(e) => setPasswordRepeatInput(e.target.value)}
              />
            </div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' type="submit" disabled={loading}>Crear cuenta</button>

            {error && <p className='text-red-600 mt-4'>{error}</p>}
          </form>
        </div>
      </div>
      <div className="h-full w-full"></div>
    </div>
  );
}

export default RegisterPage;
