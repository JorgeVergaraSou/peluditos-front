import { useLocation } from "react-router-dom";
import { PrivateRoutes } from "../models/routes";

export function useEsPaginaProtegida() {
  const location = useLocation();

  // Convertimos todos los valores del objeto PrivateRoutes a un array
  const rutasProtegidas = Object.values(PrivateRoutes);

  // Devuelve true si la ruta actual empieza con alguna de las rutas privadas
  return rutasProtegidas.some((ruta) =>
    location.pathname.startsWith(`/${ruta}`)
  );
}
