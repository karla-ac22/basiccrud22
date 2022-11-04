import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const App = () => {
  const [tarea, setTarea] = useState('');
  const [tareas, setTareas] = useState([]);
  const [edicion, setEdicion] = useState(false);
  const [id, setId] = useState('');
  const [error, setError] = useState(null);

  const addTarea = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log('Elemento vacío');
      setError('Escribe algo por favor.');
      return;
    }
    console.log(tarea);

    setTareas([...tareas, { id: nanoid(), nombreTarea: tarea }]);

    setTarea('');
    setError('');
  };

  const eliminarTarea = (id) => {
    const arrayFiltr = tareas.filter((item) => item.id !== id);
    //filter es js
    setTareas(arrayFiltr);
  };

  const editar = (item) => {
    console.log(item);
    setEdicion(true);
    setTarea(item.nombreTarea);
    setId(item.id);
  };

  const editTarea = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log('Elemento vacío');
      setError('Escribe algo por favor.');
      return;
    }

    const arrayEdited = tareas.map((item) =>
      item.id === id ? { id: id, nombreTarea: tarea } : item
    );
    setTareas(arrayEdited);
    setEdicion(false);
    setTarea('');
    setId('');
    setError('');
  };

  return (
    <div className="container">
      <br />
      <h1 className="text-center">CRUD Simple</h1>
      <br />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item">No hay tareas</li>
            ) : (
              tareas.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.nombreTarea}</span>
                  <button
                    className="btn btn-danger btn-sm float-end mx-2"
                    onClick={() => eliminarTarea(item.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-end"
                    onClick={() => editar(item)}
                  >
                    Editar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {edicion ? 'Editar Tarea' : 'Agregar Tarea'}
          </h4>
          <form onSubmit={edicion ? editTarea : addTarea}>
            {error ? <span className="text-danger">{error}</span> : null}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {edicion ? (
              <button className="btn btn-warning w-100" type="submit">
                Editar
              </button>
            ) : (
              <button className="btn btn-dark w-100" type="submit">
                Agregar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
