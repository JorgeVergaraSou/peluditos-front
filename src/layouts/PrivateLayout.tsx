// src/layouts/PrivateLayout.tsx
import { Sidebar } from "../components/Sidebar";

interface PrivateLayoutProps {
  center: React.ReactNode;
}

export default function PrivateLayout({ center }: PrivateLayoutProps) {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar fijo a la izquierda */}
        <div className="col-3 bg-light min-vh-100">
          <Sidebar />
        </div>

        {/* Contenido dinámico */}
        <div className="col-9 p-4">
          {center}
        </div>
      </div>
    </div>
  );
}
