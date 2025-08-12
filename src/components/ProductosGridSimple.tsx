import { ProductosInterface } from "../interfaces/productos.interface";
import { getImageUrl } from "../utilities";
import { useDispatch } from "react-redux";
import { agregarProducto } from '../redux/states/carrito';
import { useState } from "react";
import ModalProducto from "./ModalProducto"; // Asegúrate de tener la ruta correcta
import { Link } from "react-router-dom";


interface Props {
  productos: ProductosInterface[];
}

const ProductosGridSimple = ({ productos }: Props) => {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<ProductosInterface | null>(null);

  const handleAgregarAlCarrito = (producto: ProductosInterface) => {
    dispatch(
      agregarProducto({
        id: producto.idProducto,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1,
      })
    );
  };

  const handleVerProducto = (producto: ProductosInterface) => {
    setProductoSeleccionado(producto);
    setModalVisible(true);
  };

  return (
    <>
      <div className="row g-4 justify-content-center">
        {productos.map((producto) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
            key={producto.idProducto}
          >
            <div className="card h-100 w-100 text-center shadow-sm">
              <img
                src={getImageUrl(producto.imagen)}
                className="card-img-top"
                alt={producto.nombre}
                style={{ objectFit: "cover", height: "180px", cursor: "pointer" }}
                onClick={() => handleVerProducto(producto)}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h6 className="card-title">{producto.nombre}</h6>
                  <p className="card-text">
                    ${producto.precio.toLocaleString()}
                  </p>
                </div>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleAgregarAlCarrito(producto)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
        {productos.length === 0 && (
          <div className="text-muted text-center">
            No se encontraron productos.
                    <Link to="/">  Volver a la tienda       </Link>
          </div>
        )}
      </div>

      {/* Modal */}
      <ModalProducto
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        producto={productoSeleccionado}
      />
    </>
  );
};


export default ProductosGridSimple;
