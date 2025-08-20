import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRoutes } from '../models';
import { Props } from '../interfaces/roles.interface';
import { useAppSelector } from '../redux/hooks';

function RoleGuard({ role }: Props) {
  const userState = useAppSelector((state) => state.user);
  return userState.role === role ? <Outlet /> : <Navigate replace to={PrivateRoutes.PRIVATE} />;
}
export default RoleGuard;