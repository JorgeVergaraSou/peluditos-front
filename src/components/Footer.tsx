const Footer = () => (
  <footer className=" border-top py-4 mt-auto">
    <div className="container">
      <div className="row text-center text-md-start align-items-center">
        {/* Columna 1 */}
        <div className="col-md-4 mb-3 mb-md-0">
          <strong>Web Master:</strong><br />
          <a href="mailto:jorgevergarasou@gmail.com">jorgevergarasou@gmail.com</a>
        </div>

        {/* Columna 2 */}
        <div className="col-md-4">
          <h6 className="mb-2">Estamos en</h6>
          <div className="ratio ratio-4x3">
            <iframe
              title="Ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.7894302148015!2d-70.6915403783279!3d-33.48083262271594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5c455b55763%3A0xbb57acca3b9aada9!2sAv.%20Buzeta%204220%2C%209210055%20Cerrillos%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses!2sar!4v1749476351633!5m2!1ses!2sar"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Columna 3 - Mapa */}

        <div className="col-md-4 mb-3 mb-md-0">
          <p className="text-muted mb-1">Todos los derechos reservados</p>
          <span className="text-muted">&copy; 2025 Peluditos Pet</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;