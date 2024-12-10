import appFirebase from '../credenciales';
import { getAuth, signOut } from 'firebase/auth';
import Form from './Form';
import List from './List';

const Home = () => {
  const auth = getAuth(appFirebase); // Inicializar Firebase Auth correctamente.

  const handleLogOut = () => {
    signOut(auth)
    
  };

  const currentUserId = auth.currentUser?.uid; // Obtener el UID del usuario autenticado.

  if (!currentUserId) {
    console.error('No hay un usuario autenticado.');
    return <p>No estás autenticado. Por favor, inicia sesión.</p>;
  }

  return (
    <div>
      {/* Navbar fija en la parte superior */}
      <header className='text-bg-dark'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow ">
        <div className="container-fluid">
          {/* Logo o nombre de la aplicación */}
          <span className="navbar-brand mb-0 h1">Trackit</span>
          
          {/* Botón alineado a la derecha */}
          <button className="btn btn-warning" onClick={handleLogOut}>
            Log out
          </button>
        </div>
      </nav>
      </header>

      {/* Contenido principal con margen superior para evitar solaparse con la navbar */}
      <div className="container mt-5 pt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Form userId={currentUserId} />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h2 className="text-center mt-5 mb-4">Mis Tareas</h2>
            <List userId={currentUserId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
