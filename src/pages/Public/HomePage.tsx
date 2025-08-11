//HomePage.tsx
import { Link } from "react-router-dom";
import { CategoriasEnum } from "../../common/categorias.enum";
import ProductosGrid from "../../components/ProductosGrid";

const HomePage = () => {
  return (

    <>


      <div className="d-flex gap-3 mb-4">
        <Link to={`/productos/categoria/${CategoriasEnum.PERROS}`}>Perros</Link>
        <Link to={`/productos/categoria/${CategoriasEnum.CACHORROS}`}>Cachorros</Link>
        <Link to={`/productos/categoria/${CategoriasEnum.GATOS}`}>Gatos</Link>
        <Link to={`/productos/categoria/${CategoriasEnum.ACCESORIOS_PERROS}`}>Accesorios Perritos</Link>
        <Link to={`/productos/categoria/${CategoriasEnum.ACCESORIOS_GATOS}`}>Accesorios Gatitos</Link>
      </div>
      <ProductosGrid />

    </>

  );
};

export default HomePage;
