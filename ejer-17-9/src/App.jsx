import { useEffect, useState } from "react";
import { Row, Form, Alert } from "react-bootstrap";
import FilmCard from "./components/filmCard/FilmCard";

function App() {
  const [films, setFilms] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("https://ghibliapi.vercel.app/films")
      .then((response) => {
        if (!response.ok) {
          setCargando(false);
          throw new Error("Error 404: No se pudieron cargar las películas");
        }
        return response.json();
      })
      .then((data) => {
        setFilms(data);
        setError(false);
        setCargando(false);
      })
      .catch((err) => setError(err.message));
  }, []);

  const peliculasFiltradas = films.filter((peli) =>
    peli.title.toLowerCase().includes(busqueda.toLowerCase())
  );
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };
  return (
    <>
      <h1 className="text-center"> Películas de Studio Ghibli</h1>

      <Form.Control
        type="text"
        placeholder="Buscar película..."
        className="mb-4"
        value={busqueda}
        onChange={handleBusquedaChange}
      />

      <Row>
        {peliculasFiltradas.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </Row>

      {error && <Alert variant="danger"> {error} </Alert>}
      {cargando && (
        <div className="text-center">
          <p>Cargando películas </p>
        </div>
      )}
      {!cargando && !error && peliculasFiltradas.length === 0 && (
        <Alert variant="info">No se encontraron películas.</Alert>
      )}
    </>
  );
}

export default App;
