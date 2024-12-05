import { useEffect, useState } from "react";
import credentials from "../credenciales";

import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";

const db = getFirestore(credentials);

const List = () => {
  const [list, setList] = useState([]);
  const [tarea, setTarea] = useState(null);
  const [habilitar, setHabilitar] = useState(false);

  // Obtener y renderizar la lista de tareas
  const getList = async () => {
    const data = await getDocs(collection(db, "tareas"));
    setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getList();
  }, []);

  const deleteTarea = async (id) => {
    await deleteDoc(doc(db, "tareas", id));
    alert("Tarea eliminada con éxito");
    getList(); // Actualizar la lista tras eliminar una tarea
  };

  const updateTarea = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "tareas", tarea.id), tarea);
      alert("Tarea actualizada con éxito");
      setTarea(null);
      setHabilitar(false);
      getList(); // Actualizar la lista tras actualizar una tarea
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedTarea = { ...tarea, [name]: value };
    setTarea(updatedTarea);

    // Verificar si todos los campos están llenos
    const allFieldsFilled = Object.values(updatedTarea).every((field) => field !== "");
    setHabilitar(allFieldsFilled);
  };

  return (
    <div>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {list.map((tarea) => (
          <div className="col" key={tarea.id}>
            <div className="card shadow-sm rounded m-1 h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mt-3">
                  {tarea.nombre}{" "}
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => setTarea(tarea)} // Establece toda la tarea
                  >
                    Editar
                  </button>
                </h5>
                <p className="card-text">Descripción: {tarea.descripcion}</p>
                <p className="card-text">Materia: {tarea.materia}</p>
                <p className="card-text">Fecha: {tarea.fecha}</p>
                <p className="card-text">Dificultad: {tarea.dificultad}</p>

                <button
                  className="btn btn-danger mt-auto"
                  onClick={() => deleteTarea(tarea.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Actualizar Tarea
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {tarea && (
                <form onSubmit={updateTarea}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control mt-2 mb-2"
                      id="floatingInput"
                      placeholder="Ingresar nombre"
                      name="nombre"
                      onChange={handleChange}
                      value={tarea.nombre}
                      required
                    />
                    <label htmlFor="floatingInput">Nombre de la Tarea</label>
                  </div>
                  <div className="form-floating">
                    <textarea
                      className="form-control mt-2 mb-2"
                      id="floatingInput"
                      placeholder="Descripción"
                      name="descripcion"
                      onChange={handleChange}
                      value={tarea.descripcion}
                      required
                    ></textarea>
                    <label htmlFor="floatingInput">Descripción</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control mt-2 mb-2"
                      id="floatingInput"
                      placeholder="Materia"
                      name="materia"
                      onChange={handleChange}
                      value={tarea.materia}
                      required
                    />
                    <label htmlFor="floatingInput">Materia</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="date"
                      className="form-control mt-2 mb-2"
                      id="floatingInput"
                      placeholder="Fecha de entrega"
                      name="fecha"
                      onChange={handleChange}
                      value={tarea.fecha}
                      required
                    />
                    <label htmlFor="floatingInput">Fecha de Entrega</label>
                  </div>
                  <div className="form-floating">
                    <select
                      className="form-control mt-2 mb-2"
                      id="floatingInput"
                      name="dificultad"
                      onChange={handleChange}
                      value={tarea.dificultad}
                      required
                    >
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                    </select>
                    <label htmlFor="floatingInput">Dificultad</label>
                  </div>
                  <button
                    className={
                      habilitar
                        ? "form-control btn btn-primary"
                        : "form-control btn btn-secondary disabled"
                    }
                    disabled={!habilitar}
                  >
                    {habilitar ? "Actualizar Tarea" : "Llena los campos"}
                  </button>
                </form>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
