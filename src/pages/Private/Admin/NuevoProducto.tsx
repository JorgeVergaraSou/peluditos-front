// src/pages/Private/Admin/NuevoProductoPage.tsx
import PrivateLayout from "../../../layouts/PrivateLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productoSchema } from "../../../validations/producto.schema";
import { NuevoProductoService } from "../../../services/productos.service";
import { CategoriasEnum } from "../../../common/categorias.enum";
import { EdadEnum } from "../../../common/edad.enum";
import { useState, useEffect } from "react";
import { resizeImage, generatePreview } from "../../../utilities/imageResize";

function NuevoProductoPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [resizedFile, setResizedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      precio: "", // inicializamos como string
    },
  });

  const imagenFile = watch("imagen");

  // Redimensionar y generar preview

  useEffect(() => {
  setError("");
  setResizedFile(null);
  setPreview(null);

  if (!imagenFile || imagenFile.length === 0) return;

  const file = imagenFile[0];

  // Validación de formato
  const validTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!validTypes.includes(file.type)) {
    setError("El formato de la imagen debe ser JPG, JPEG o PNG");
    return;
  }

  // Validación de tamaño
  if (file.size > 5 * 1024 * 1024) {
    setError("La imagen debe ser menor a 5 MB");
    return;
  }

  // Redimensionar y generar preview usando utils
  resizeImage(file)
    .then((resized) => {
      setResizedFile(resized);
      setPreview(generatePreview(resized));
    })
    .catch(() => setError("Error al procesar la imagen"));

}, [imagenFile]);


  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("nombre", data.nombre);
      formData.append("descripcion", data.descripcion || "");
      formData.append("precio", data.precio.toString());
      formData.append("categoria", data.categoria);
      formData.append("edad", data.edad);

      if (resizedFile) formData.append("imagen", resizedFile);

      await NuevoProductoService(formData);

      alert("Producto creado correctamente!");
      reset();
      setPreview(null);
      setResizedFile(null);
    } catch (err: any) {
      setError(err.message || "Error al crear producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateLayout
      center={
        <div className="container">
          <h2>Nuevo Producto</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            {/* Nombre */}
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" {...register("nombre")} />
              {errors.nombre && <small className="text-danger">{errors.nombre.message}</small>}
            </div>

            {/* Descripción */}
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea className="form-control" {...register("descripcion")} />
              {errors.descripcion && <small className="text-danger">{errors.descripcion.message}</small>}
            </div>

            {/* Precio */}
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="text"
                className="form-control"
                {...register("precio")}
                inputMode="numeric"
                pattern="\d*"
              />
              {errors.precio && <small className="text-danger">{errors.precio.message}</small>}
            </div>

            {/* Categoría */}
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <select className="form-select" {...register("categoria")}>
                <option value="">Seleccione una categoría</option>
                {Object.values(CategoriasEnum).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.categoria && <small className="text-danger">{errors.categoria.message}</small>}
            </div>

            {/* Edad */}
            <div className="mb-3">
              <label className="form-label">Edad</label>
              <select className="form-select" {...register("edad")}>
                <option value="">Seleccione la edad</option>
                {Object.values(EdadEnum).map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
              {errors.edad && <small className="text-danger">{errors.edad.message}</small>}
            </div>

            {/* Imagen */}
            <div className="mb-3">
              <label className="form-label">Imagen</label>
              <input type="file" className="form-control" {...register("imagen")} accept="image/*" />
            </div>

            {preview && (
              <div className="mb-3">
                <label className="form-label">Preview:</label>
                <img src={preview} alt="Preview" className="img-fluid" style={{ maxHeight: "200px" }} />
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Cargando..." : "Crear Producto"}
            </button>
          </form>
        </div>
      }
    />
  );
}

export default NuevoProductoPage;
