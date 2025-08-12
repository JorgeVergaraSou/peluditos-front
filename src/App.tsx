import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes, Roles } from './models';
import { AuthGuard } from './guards';
import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';

import RoleGuard from './guards/rol.guard';
import Admin from './pages/Private/Admin/Admin';
import Header from './components/Header';
import ProfilePage from './pages/Private/Profile';
import RoutesWithNotFound from './utilities/RoutesWithNotFound.utility';
import Register from './pages/Register/Register';
import { store } from './redux/store';
import CarritoFlotante from './components/CarritoFlotante';
import WhatsAppButton from './components/WhatsAppButton';

const Login = lazy(() => import('./pages/Login/Login'));
const Private = lazy(() => import('./pages/Private/Private'));
const HomePage = lazy(() => import('./pages/Public/HomePage'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <BrowserRouter>
            <Header />

            <RoutesWithNotFound>

              {/* Rutas públicas */}
              <Route path="/" element={<Navigate replace to={PublicRoutes.HOME_PAGE} />} />
              <Route path={PublicRoutes.HOME_PAGE} element={<HomePage />} />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route path={PublicRoutes.REGISTER} element={<Register />} />

              {/* Rutas privadas protegidas */}
              <Route element={<AuthGuard privateValidation={true} />}>
                <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
                <Route path={PrivateRoutes.PERFIL} element={<ProfilePage />} />

                {/* Rutas solo admin */}
                <Route element={<RoleGuard role={Roles.ADMIN} />}>
                  <Route path={PrivateRoutes.ADMIN} element={<Admin />} />                  
                </Route>

                {/* Logout */}
                <Route path={PrivateRoutes.LOGOUT} element={<Navigate replace to={PublicRoutes.LOGIN} />} />
              </Route>

            </RoutesWithNotFound>

                      <CarritoFlotante />
            <WhatsAppButton />

          </BrowserRouter>
        </Provider>
      </Suspense>
    </div>
  );
}
export default App;
