import appFirebase from '../credenciales';
import { getAuth, signOut } from 'firebase/auth';
import Form from './Form';
import List from './List';

const Home = () => {
  const auth = getAuth(appFirebase); // Asegúrate de inicializar `appFirebase` correctamente

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Usuario deslogeado correctamente');
        // Opcional: Redirigir al usuario o mostrar un mensaje
      })
      .catch((error) => {
        console.error('Error al intentar desloguear al usuario:', error);
      });
  };

  return (
    <div className='container'>
      <div className="row g-1">
        <button className='btn btn-primary' onClick={handleLogOut}>Log out</button>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Form />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h2 className='text-center mt-5 mb-4'>Mis Tareas</h2>
            <List />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
