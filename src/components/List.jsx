import { useEffect, useState } from "react";
import credentials from "../credenciales";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { onSnapshot, query, where } from "firebase/firestore";

const db = getFirestore(credentials);
const auth = getAuth(credentials);

const List = () => {
  const [list, setList] = useState([]);
  const [tarea, setTarea] = useState(null);
  const [habilitar, setHabilitar] = useState(false);

  // Obtener y renderizar la lista de tareas solo del usuario logueado
  const getList = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const data = await getDocs(collection(db, "tareas"));
        const userTasks = data.docs
          .filter((doc) => doc.data().userId === user.uid) // Filtrar por userId
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setList(userTasks);
      } else {
        alert("Usuario no autenticado.");
      }
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
      alert("No se pudieron cargar las tareas.");
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(db, "tareas"), where("userId", "==", user.uid)); // Consulta para el usuario actual
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const userTasks = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setList(userTasks);
      });
  
      // Limpiar el listener al desmontar el componente
      return () => unsubscribe();
    } else {
      alert("Usuario no autenticado.");
    }
  }, []);

  const deleteTarea = async (id) => {
    try {
      await deleteDoc(doc(db, "tareas", id));
      alert("Tarea eliminada con éxito");
      getList(); // Actualizar la lista tras eliminar una tarea
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      alert("No se pudo eliminar la tarea.");
    }
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
      console.error("Error al actualizar la tarea:", error);
      alert("No se pudo actualizar la tarea.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedTarea = { ...tarea, [name]: value };
    setTarea(updatedTarea);

    // Verificar si todos los campos están llenos
    const allFieldsFilled = Object.values(updatedTarea).every(
      (field) => field !== ""
    );
    setHabilitar(allFieldsFilled);
  };

  return (
    <div>
      <header className='text-bg-dark'>

      </header>
      <div className="row row-cols-1 row-cols-md-1 g-4">
        {list.map((tarea) => (
          <div className="col" key={tarea.id}>
            <div className="card shadow-sm rounded m-1 h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mt-3">
                  {tarea.nombre}{" "}
                  
                </h5>
                <p className="card-text">Descripción: {tarea.descripcion}</p>
                <p className="card-text">Materia: {tarea.materia}</p>
                <p className="card-text">Fecha: {tarea.fecha}</p>
                <p className="card-text">Dificultad: {tarea.dificultad}</p>
<button
                    type="button"
                    className="btn btn-info btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => setTarea(tarea)} // Establece toda la tarea
                  >
                    Editar
                  </button>
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
        className="modal fade text-bg-dark"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog text-bg-dark">
          <div className="modal-content text-bg-dark">
            <div className="modal-header text-bg-dark">
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
            <div className="modal-body text-bg-dark">
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
                        ? "form-control btn btn-warning"
                        : "form-control btn btn-secondary disabled"
                    }
                    disabled={!habilitar}
                  >
                    {habilitar ? "Actualizar Tarea" : "No hay cambios"}
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