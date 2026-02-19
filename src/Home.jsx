import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");

    if (!loggedIn) {
      navigate("/login");
      return;
    }

    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}`
      );
      const data = await res.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  const heroMovie = movies[0];

  return (
    <div className="bg-black text-white min-h-screen relative">

      {/* Logout Button */}
      <button
        onClick={() => {
          localStorage.removeItem("isLoggedIn");
          navigate("/login");
        }}
        className="absolute top-6 right-10 bg-red-600 px-4 py-2 rounded"
      >
        Logout
      </button>

      {/* HERO SECTION */}
      {heroMovie && (
        <div
          className="h-[80vh] bg-cover bg-center flex items-end p-10"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
          }}
        >
          <div className="bg-gradient-to-t from-black via-black/70 to-transparent w-full p-6 rounded">
            <h1 className="text-5xl font-bold mb-4">
              {heroMovie.title}
            </h1>
            <p className="max-w-xl text-gray-300">
              {heroMovie.overview}
            </p>
          </div>
        </div>
      )}

      {/* MOVIE ROW */}
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-4">Popular Movies</h2>

        <div className="flex space-x-4 overflow-x-scroll">
          {movies.map((movie) => (
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-40 rounded hover:scale-110 transition duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
