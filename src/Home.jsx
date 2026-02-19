import { useEffect, useState } from "react";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}`
        );

        const data = await res.json();
        setMovies(data.results || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const heroMovie = movies[0];

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading Movies...
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">

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
        <h2 className="text-2xl font-bold mb-6">Popular Movies</h2>

        <div className="flex space-x-4 overflow-x-auto">
          {movies.map((movie) => (
            <div key={movie.id} className="min-w-[160px]">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="rounded hover:scale-110 transition duration-300 cursor-pointer"
              />
              <p className="mt-2 text-sm text-center">
                {movie.title}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;
