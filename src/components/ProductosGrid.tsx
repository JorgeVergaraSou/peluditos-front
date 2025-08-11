import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getImageUrl } from '../utilities';
import ModalProducto from './ModalProducto';
import { ProductosInterface } from '../interfaces/productos.interface';
import { ListarProductosService } from '../services';
import { agregarProducto } from '../redux/states/carrito';

const ProductosGrid = () => {
  const [productos, setProductos] = useState<ProductosInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState<ProductosInterface | null>(null);
  const dispatch = useDispatch();
   const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await ListarProductosService();

        if (data.success) {
          setProductos(data.productos.slice(0, 9)); // Mostrar solo 9 productos
        } else {
          setError("Error al cargar productos.");
        }
      } catch (e: any) {
        setError(e.message || "Error inesperado.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

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



  if (loading) return <div className="text-center mt-5">Cargando productos...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <>
      <div className="row g-4 justify-content-center">
        {productos.map((producto) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex" key={producto.idProducto}>
            <div className="card h-100 w-100 text-center shadow-sm">
              <img
                src={getImageUrl(producto.imagen)}
                className="card-img-top"
                alt={producto.nombre}
                style={{ objectFit: 'cover', height: '180px', cursor: 'pointer' }}
                onClick={() => handleVerProducto(producto)}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h6 className="card-title">{producto.nombre}</h6>
                  <p className="card-text">${producto.precio.toLocaleString()}</p>
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
          <div className="text-muted text-center">No se encontraron productos.</div>
        )}
      </div>

      {/* Modal de descripción */}
      <ModalProducto
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        producto={productoSeleccionado}
      />
    </>
  );
};

export default ProductosGrid;
