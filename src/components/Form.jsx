import credentials from "../credenciales";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useState } from "react";


const db = getFirestore(credentials);

const Form = () => {
  const tareaInicial = {
    nombre: "",
    descripcion: "",
    materia: "",
    fecha: "",
    dificultad: "Baja",
  };

  const [tarea, setTarea] = useState(tareaInicial);
  const [showModal, setShowModal] = useState(false); // Estado para el modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarea({ ...tarea, [name]: value });
  };

  const saveTarea = async (e) => {
    e.preventDefault();
    try {
      const nuevaTarea = {
        nombre: tarea.nombre,
        descripcion: tarea.descripcion,
        materia: tarea.materia,
        fecha: tarea.fecha,
        dificultad: tarea.dificultad,
      };
      await addDoc(collection(db, "tareas"), nuevaTarea);
      alert("Tarea registrada con éxito");
      setTarea(tareaInicial);
      setShowModal(false); // Cierra el modal después de guardar
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
  {/* Botón para abrir el modal */}
  <button
    className="btn btn-primary"
    onClick={() => setShowModal(true)}
  >
    Registrar Tarea
  </button>

  {/* Modal */}
  {showModal && (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="text-center">Registro de Tarea</h4>
          <button
            className="btn-close"
            onClick={() => setShowModal(false)}
          >
            ×
          </button>
        </div>
        <form className="p-4" onSubmit={saveTarea}>
          <div className="form-floating">
            <input
              type="text"
              className="form-control mt-2 mb-2"
              id="floatingNombre"
              placeholder="Ingresar nombre de la tarea"
              name="nombre"
              onChange={handleChange}
              value={tarea.nombre}
              required
            />
            <label htmlFor="floatingNombre">Nombre de la Tarea</label>
          </div>
          <div className="form-floating">
            <textarea
              className="form-control mt-2 mb-2"
              id="floatingDescripcion"
              placeholder="Descripción de la tarea"
              name="descripcion"
              onChange={handleChange}
              value={tarea.descripcion}
              required
            ></textarea>
            <label htmlFor="floatingDescripcion">Descripción</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control mt-2 mb-2"
              id="floatingMateria"
              placeholder="Materia"
              name="materia"
              onChange={handleChange}
              value={tarea.materia}
              required
            />
            <label htmlFor="floatingMateria">Materia</label>
          </div>
          <div className="form-floating">
            <input
              type="date"
              className="form-control mt-2 mb-2"
              id="floatingFecha"
              name="fecha"
              onChange={handleChange}
              value={tarea.fecha}
              required
            />
            <label htmlFor="floatingFecha">Fecha de Entrega</label>
          </div>
          <div className="form-floating">
            <select
              className="form-control mt-2 mb-2"
              id="floatingDificultad"
              name="dificultad"
              onChange={handleChange}
              value={tarea.dificultad}
              required
            >
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
            <label htmlFor="floatingDificultad">Dificultad</label>
          </div>
          <button className="form-control btn btn-primary">Guardar Tarea</button>
         
        </form>
      </div>
    </div>
  )}

  {/* Estilos del modal */}
  <style >{`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1050; /* Mayor que el z-index de otros elementos */
    }
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 10px;
      width: 400px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      z-index: 1100; /* Asegura que esté por encima del overlay */
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .btn-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
  `}</style>
</div>

  );
};

export default Form;
