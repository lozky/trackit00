import { useState, useEffect } from 'react';
import appFirebase from './credenciales'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';

const auth = getAuth(appFirebase);

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      console.log(usuarioFirebase); // Verifica el estado de autenticación
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
      } else {
        setUsuario(null);
      }
    });

    return () => unsubscribe(); // Limpia el suscriptor cuando el componente se desmonte
  }, []);

  return (
    <div>
      {usuario ? <Home correoUsuario={usuario.email} /> : <Login />}
    </div>
  );
}

export default App;
