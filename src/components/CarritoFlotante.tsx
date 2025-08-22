import { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import CarritoModalWhatsApp from "./CarritoModalWhatsapp";

const CarritoFlotante = () => {
  const productos = useAppSelector((state) => state.carrito.productos);
  const cantidadTotal = productos.reduce((acc, p) => acc + p.cantidad, 0);

  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="btn btn-primary rounded-circle position-fixed"
        style={{
          bottom: "1rem",
          right: "1rem",
          width: "56px",
          height: "56px",
          zIndex: 1300,
        }}
      >
        <i className="bi bi-cart"></i>
        {cantidadTotal > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cantidadTotal}
          </span>
        )}
      </button>

      <CarritoModalWhatsApp open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CarritoFlotante;
