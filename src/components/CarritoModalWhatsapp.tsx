import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { eliminarProducto, vaciarCarrito } from "../redux/states/carrito";

interface CarritoModalProps {
  open: boolean;
  onClose: () => void;
}

const CarritoModalWhatsApp = ({ open, onClose }: CarritoModalProps) => {
  const dispatch = useAppDispatch();
  const productos = useAppSelector((state) => state.carrito.productos);

  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const handleEliminar = (id: number) => {
    dispatch(eliminarProducto(id));
  };

  const enviarPorWhatsApp = () => {
    if (!nombre || !telefono || !direccion) {
      alert("Por favor completá tus datos antes de continuar.");
      return;
    }

    const numeroNegocio = "56920304635"; // tu número de WhatsApp con código país (ej: Argentina 54911...)
    const productosTexto = productos
      .map((p) => `- ${p.nombre} x${p.cantidad} = $${p.precio * p.cantidad}`)
      .join("\n");

    const mensaje = `
Nuevo pedido:
Nombre: ${nombre}
Teléfono: ${telefono}
Dirección: ${direccion}

Productos:
${productosTexto}

Total: $${total}
    `;

    const url = `https://wa.me/${numeroNegocio}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
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
                <button className="btn btn-success" onClick={enviarPorWhatsApp}>
                  Enviar por WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoModalWhatsApp;
