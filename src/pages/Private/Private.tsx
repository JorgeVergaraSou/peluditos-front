import { Navigate, Route } from "react-router-dom"
import { PrivateRoutes } from "../../models"
import { lazy } from "react"
import RoutesWithNotFound from "../../utilities/RoutesWithNotFound.utility"

const Admin = lazy(() => import('./Admin/Admin'))
//const UserPage = lazy(() => import('./User/User'))

function Private() {
  //const userRole = useSelector((state: AppStore) => state.user.role);
  return (
    
     <RoutesWithNotFound>
      <Route path='/' element={<Navigate to={PrivateRoutes.ADMIN} />} />
      <Route path={PrivateRoutes.ADMIN} element={<Admin />} />
      {/* <Route path={PrivateRoutes.USER} element={<UserPage />} /> */}
      {/* Aquí puedes agregar más rutas privadas según sea necesario */}
    </RoutesWithNotFound>

  )
}
export default Private