import React, { useState } from "react";
import appFirebase from "../credenciales";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(appFirebase);

const Login = () => {
  const [registrando, setRegistrando] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal

  const loginUser = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.pass.value;

    if (!correo || !contraseña) {
      setError("Por favor, ingresa ambos campos");
      return;
    }

    setRegistrando(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, correo, contraseña);
      console.log("Usuario logueado:", userCredential.user);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        window.alert("El usuario no existe. Por favor, regístrate.");
      } else {
        setError(error.message);
      }
    } finally {
      setRegistrando(false);
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.pass.value;

    if (!correo || !contraseña) {
      setError("Por favor, completa ambos campos para registrarte");
      return;
    }

    setRegistrando(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
      console.log("Usuario registrado:", userCredential.user);
      window.alert("Registro exitoso");
      setShowModal(false); // Cierra el modal tras el registro exitoso
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        window.alert("El usuario ya existe. Por favor, inicia sesión.");
      } else {
        setError(error.message);
      }
    } finally {
      setRegistrando(false);
    }
  };

  return (
    <div>
     <header className="p-3 pb-4 text-bg-dark">
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow ">
        <div className="container-fluid">
          {/* Logo o nombre de la aplicación */}
          <span className="navbar-brand mb-0 h1">Trackit</span>
          
          {/* Botón alineado a la derecha */}
          <button
        className="btn btn-warning mt-3"
        onClick={() => setShowModal(true)}
      >
        Regístrate
      </button>
        </div>
      </nav>
  </header >


    <div className="container col-12 d-flex flex-column align-items-center">
      <form onSubmit={loginUser}>
        <h4 className="text-center mb-4">Inicia Sesión</h4>
        {error && <p className="text-danger">{error}</p>}

        <div className="form-outline mb-4">
          <input type="email" id="email" name="email" className="form-control" required />
          <label className="form-label" htmlFor="email">Email address</label>
        </div>

        <div className="form-outline mb-4">
          <input type="password" id="pass" name="pass" className="form-control" required />
          <label className="form-label" htmlFor="pass">Password</label>
        </div>

        <button
          type="submit"
          className="btn btn-warning btn-block mb-4"
          disabled={registrando}
        >
          {registrando ? "Procesando..." : "Inicia Sesión"}
        </button>
      </form>

      <h5>or</h5>

      <button
        className="btn btn-secondary mt-3"
        onClick={() => setShowModal(true)}
      >
        Regístrate
      </button>

      {/* Modal para registro */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Regístrate</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={registerUser}>
                  {error && <p className="text-danger">{error}</p>}

                  <div className="form-outline mb-4">
                    <input type="email" id="register-email" name="email" className="form-control" required />
                    <label className="form-label" htmlFor="register-email">Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="register-pass" name="pass" className="form-control" required />
                    <label className="form-label" htmlFor="register-pass">Password</label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning btn-block"
                    disabled={registrando}
                  >
                    {registrando ? "Procesando..." : "Regístrate"}
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Login;
