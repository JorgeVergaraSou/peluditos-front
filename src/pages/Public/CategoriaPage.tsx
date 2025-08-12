import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductosInterface } from "../../interfaces/productos.interface";
import { ListarProductosService } from "../../services/productos.service";
import ProductosGridSimple from "../../components/ProductosGridSimple";


const CategoriaPage = () => {
  const { categoria } = useParams();
  const [productos, setProductos] = useState<ProductosInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await ListarProductosService(); // Puedes agregar soporte a filtro backend también
        if (data.success) {
          const filtrados = data.productos.filter(
            (p: ProductosInterface) =>
              p.categoria.toLowerCase() === categoria?.toLowerCase()
          );
          setProductos(filtrados);
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
  }, [categoria]);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h2 className="text-center my-4">Categoría: {categoria}</h2>
      <ProductosGridSimple productos={productos} />
    </>
  );
};

export default CategoriaPage;
