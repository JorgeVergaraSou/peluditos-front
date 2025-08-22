// src/pages/public/Login.tsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { createUser } from '../../redux/states/user';
import { loginService } from '../../services/auth.service';
import { getRoleRoute } from '../../utilities';
import { PublicRoutes, Roles } from '../../models';
import PublicLayout from '../../layouts/PublicLayout';

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
      const query = new URLSearchParams(location.search);
      const redirectPath = query.get('redirect') || roleRoute;
      navigate(redirectPath, { replace: true });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout
      center={
        <div className="row w-100">
          <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="email@email.com"
                      onChange={(e) => setEmailInput(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="******"
                      onChange={(e) => setPasswordInput(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="d-flex justify-content-between">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Ingresando...' : 'Entrar'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate(`/${PublicRoutes.REGISTER}`)}
                    >
                      Registrarse
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

export default Login;
