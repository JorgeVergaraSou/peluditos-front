// src/components/Sidebar.tsx
import { Link } from "react-router-dom";
import { PrivateRoutes } from "../models/routes";
import { useAppSelector } from "../redux/hooks";

export function Sidebar() {
  const user = useAppSelector((state) => state.user); // 👈 acá ya tenés tu usuario desde redux

  return (
    <div className="p-3">
      <div className="mb-3">
        Bienvenido {user?.name ?? "Usuario"}
      </div>
      <nav className="d-flex flex-column gap-2">
        <Link to={`/${PrivateRoutes.NUEVO_PRODUCTO}`} className="btn btn-outline-primary">
          Nuevo Producto
        </Link>

        <Link to={`/${PrivateRoutes.LISTAR_PRODUCTOS}`} className="btn btn-outline-secondary">
          Listado Productos
        </Link>

        <Link to={`/${PrivateRoutes.LOGOUT}`} className="btn btn-outline-secondary">
          Cerrar Sesión
        </Link>
      </nav>
    </div>
  );
}
