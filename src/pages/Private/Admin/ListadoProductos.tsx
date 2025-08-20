// src/pages/Private/Admin/ListadoProductosPage.tsx
import { useEffect, useState } from "react";
import PrivateLayout from "../../../layouts/PrivateLayout";
import { Button, Modal, Form, Pagination } from "react-bootstrap";
import { ProductosInterface } from "../../../interfaces/productos.interface";
import {
  actualizarProductoService,
  listarTodosProductosService,
  activarProductoService,
  desactivarProductoService,
} from "../../../services/productos.service";
import { CategoriasEnum } from "../../../common/categorias.enum";
import { EdadEnum } from "../../../common/edad.enum";
import { resizeImage, generatePreview } from "../../../utilities/imageResize";
import { getImageUrl } from "../../../utilities";

function ListadoProductosPage() {
  const [productos, setProductos] = useState<ProductosInterface[]>([]);
  const [loading, setLoading] = useState(true);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productosPorPagina = 15;
  const indexOfLastProducto = currentPage * productosPorPagina;
  const indexOfFirstProducto = indexOfLastProducto - productosPorPagina;
  const productosActuales = productos.slice(indexOfFirstProducto, indexOfLastProducto);
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

  // Modal
  const [show, setShow] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<ProductosInterface | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resizedFile, setResizedFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setProductoSeleccionado(null);
    setPreview(null);
    setResizedFile(null);
    setError("");
  };

  const handleShow = (producto: ProductosInterface) => {
    setProductoSeleccionado(producto);
    setPreview(`/img/${producto.imagen}`);
    setResizedFile(null);
    setShow(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!productoSeleccionado) return;
    setProductoSeleccionado({ ...productoSeleccionado, [e.target.name]: e.target.value });
  };

  const handleImagenChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("El formato de la imagen debe ser JPG, JPEG o PNG");
      setPreview(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen debe ser menor a 5 MB");
      setPreview(null);
      return;
    }

    try {
      const resized = await resizeImage(file);
      setResizedFile(resized);
      setPreview(generatePreview(resized));
    } catch (err) {
      console.error("Error al redimensionar la imagen:", err);
      setError("Error al procesar la imagen");
      setPreview(null);
    }
  };

  const handleSave = async () => {
    if (!productoSeleccionado) return;
    try {
      const formData = new FormData();
      formData.append("nombre", productoSeleccionado.nombre);
      formData.append("descripcion", productoSeleccionado.descripcion || "");
      formData.append("precio", productoSeleccionado.precio.toString());
      formData.append("categoria", productoSeleccionado.categoria);
      formData.append("edad", productoSeleccionado.edad);

      if (resizedFile) {
        formData.append("imagen", resizedFile);
      }

      const actualizado = await actualizarProductoService(
        productoSeleccionado.idProducto,
        formData
      );

      setProductos((prev) =>
        prev.map((p) => (p.idProducto === actualizado.idProducto ? actualizado : p))
      );

      handleClose();
    } catch (err: any) {
      console.error("Error al actualizar producto:", err);
      setError(err.message || "Error al actualizar producto");
    }
  };

  const handleDesactivar = async (id: number) => {
    try {
      await desactivarProductoService(id);
      setProductos((prev) =>
        prev.map((p) =>
          p.idProducto === id ? { ...p, deletedAt: new Date().toISOString() } : p
        )
      );
    } catch (error) {
      console.error("Error al desactivar producto:", error);
    }
  };

  const handleActivar = async (id: number) => {
    try {
      await activarProductoService(id);
      setProductos((prev) =>
        prev.map((p) => (p.idProducto === id ? { ...p, deletedAt: null } : p))
      );
    } catch (error) {
      console.error("Error al activar producto:", error);
    }
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await listarTodosProductosService();
        setProductos(Array.isArray(data) ? data : data.productos || []);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando productos:", error);
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  const renderPaginationItems = () => {
    const items = [];
    for (let number = 1; number <= totalPaginas; number++) {
      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <PrivateLayout
      center={
        <div className="container mt-4">
          <h2>Listado de Productos</h2>

          {loading ? (
            <p>Cargando...</p>
          ) : (
            <>
              <table className="table table-hover mt-3">
                <thead className="table-dark">
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Edad</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productosActuales.map((prod) => (
                    <tr key={prod.idProducto} className={prod.deletedAt ? "table-secondary" : ""}>
                      <td>
                        <img
                            src={getImageUrl(prod.imagen)}
                          alt={prod.nombre}
                          style={{ width: "80px", height: "60px", objectFit: "cover" }}
                        />
                      </td>
                      <td>{prod.nombre}</td>
                      <td>{prod.categoria}</td>
                      <td>{prod.edad}</td>
                      <td>${prod.precio}</td>
                      <td >
                        <Button variant="primary" size="sm" onClick={() => handleShow(prod)}>
                          Editar
                        </Button>
                        {prod.deletedAt ? (
                          <Button variant="success" size="sm" onClick={() => handleActivar(prod.idProducto)}>
                            Activar
                          </Button>
                        ) : (
                          <Button variant="danger" size="sm" onClick={() => handleDesactivar(prod.idProducto)}>
                            Desactivar
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="d-flex justify-content-center">
                <Pagination>{renderPaginationItems()}</Pagination>
              </div>
            </>
          )}

          {/* Modal */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {error && <div className="alert alert-danger">{error}</div>}
              {productoSeleccionado && (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      value={productoSeleccionado.nombre}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="descripcion"
                      value={productoSeleccionado.descripcion || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                      type="number"
                      name="precio"
                      value={productoSeleccionado.precio}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Select name="categoria" value={productoSeleccionado.categoria} onChange={handleChange}>
                      <option value="">Seleccione una categoría</option>
                      {Object.values(CategoriasEnum).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Edad</Form.Label>
                    <Form.Select name="edad" value={productoSeleccionado.edad} onChange={handleChange}>
                      <option value="">Seleccione la edad</option>
                      {Object.values(EdadEnum).map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleImagenChange} />
                  </Form.Group>

                  {preview && (
                    <div className="mb-3">
                      <Form.Label>Preview:</Form.Label>
                      <img src={preview} alt="Preview" className="img-fluid" style={{ maxHeight: "200px" }} />
                    </div>
                  )}
                </Form>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="success" onClick={handleSave}>
                Guardar Cambios
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      }
    />
  );
}

export default ListadoProductosPage;
