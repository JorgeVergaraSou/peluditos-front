import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { eliminarProducto, vaciarCarrito } from "../redux/states/carrito";

interface CarritoModalProps {
  open: boolean;
  onClose: () => void;
}

const CarritoModal = ({ open, onClose }: CarritoModalProps) => {
  const dispatch = useAppDispatch();
  const productos = useAppSelector((state) => state.carrito.productos);

  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const handleEliminar = (id: number) => {
    dispatch(eliminarProducto(id));
  };

  const continuarAlPago = async () => {
    if (!nombre || !telefono || !direccion) {
      alert("Por favor completá tus datos antes de continuar.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/crear-preferencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productos,
          cliente: { nombre, telefono, direccion },
        }),
      });

      const data = await response.json();
      if (data.id) {
        window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.id}`;
      } else {
        alert("No se pudo crear la preferencia de pago.");
      }
    } catch (error) {
      console.error("Error al continuar al pago:", error);
      alert("Hubo un problema al conectar con Mercado Pago.");
    }
  };

  if (!open) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Carrito</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {productos.length === 0 ? (
              <p>Tu carrito está vacío</p>
            ) : (
              <>
                <ul className="list-group mb-3">
                  {productos.map((producto) => (
                    <li
                      key={producto.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        {producto.nombre} x{producto.cantidad}
                        <br />
                        <small>${producto.precio * producto.cantidad}</small>
                      </div>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleEliminar(producto.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </li>
                  ))}
                </ul>

                <h5>Total: ${total}</h5>

                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="form-group mt-2">
                  <label>Teléfono</label>
                  <input
                    type="text"
                    className="form-control"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </div>
                <div className="form-group mt-2">
                  <label>Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button
              className="btn btn-outline-danger"
              onClick={() => dispatch(vaciarCarrito())}
            >
              Vaciar
            </button>
            <div className="d-flex gap-2">
              <button className="btn btn-secondary" onClick={onClose}>
                Cerrar
              </button>
              {productos.length > 0 && (
                <button className="btn btn-success" onClick={continuarAlPago}>
                  Continuar al pago
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoModal;
