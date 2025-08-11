// src/components/ModalProducto.tsx
import { Modal, Button } from "react-bootstrap";
import { ProductosInterface } from "../interfaces/productos.interface";
import { getImageUrl } from "../utilities";

interface Props {
  show: boolean;
  onHide: () => void;
  producto: ProductosInterface | null;
}

const ModalProducto = ({ show, onHide, producto }: Props) => {
  if (!producto) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{producto.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <img
          src={getImageUrl(producto.imagen)}
          alt={producto.nombre}
          className="img-fluid mb-3"
          style={{ maxHeight: "200px", objectFit: "contain" }}
        />
        <p className="fw-bold fs-5">
          Precio: ${producto.precio.toLocaleString()}
        </p>
        <p><strong>Descripción:</strong> {producto.descripcion || "Sin descripción."}</p>
        {/* Agrega más detalles si deseas */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProducto;
