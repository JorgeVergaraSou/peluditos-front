
import { Link } from "react-router-dom";
import { CategoriasEnum } from "../common/categorias.enum";


const Header = () => (
  <header className="bg-white border-bottom shadow-sm py-3">
    <div className="row align-items-center text-center">
      <div className="col-4 col-md-2">
        <Link to="/">
          <img
            src="/img/logo.PNG"
            alt="Logo"
            className="img-fluid"
            style={{ maxHeight: '90px', width: 'auto', cursor: 'pointer' }}
          />
        </Link>
      </div>
      <div className="col-4 col-md-8">
        <h1 className="h3 mb-0" style={{ color: '#351072' }}>
          Peluditos Pet
        </h1>
        <h1 className="h3 mb-0" style={{ color: '#351072' }}>
          Tú tienda de Mascotas
        </h1>
      </div>
      <div className="col-4 col-md-2">
        <Link to="/">
          <img
            src="/img/logoderecha.jpg"
            alt="Logo"
            className="img-fluid"
            style={{ maxHeight: '90px', width: 'auto', cursor: 'pointer' }}
          />
        </Link>
      </div>
    </div>
    <div className="d-flex gap-3 mb-4">
      <Link to={`/productos/categoria/${CategoriasEnum.PERROS}`}>Perros</Link>
      <Link to={`/productos/categoria/${CategoriasEnum.CACHORROS}`}>Cachorros</Link>
      <Link to={`/productos/categoria/${CategoriasEnum.GATOS}`}>Gatos</Link>
      <Link to={`/productos/categoria/${CategoriasEnum.ACCESORIOS_PERROS}`}>Accesorios Perritos</Link>
      <Link to={`/productos/categoria/${CategoriasEnum.ACCESORIOS_GATOS}`}>Accesorios Gatitos</Link>
    </div>
  </header>
);

export default Header;