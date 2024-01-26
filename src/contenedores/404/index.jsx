import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div>
      <h1>Error 404 - Página no encontrada</h1>
      <p>La página que estás buscando no existe.</p>
      <Link to="/">Volver a la página de inicio</Link>
    </div>
  );
};

export default Error404;