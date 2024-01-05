import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieService from "../services/MovieService";

export default function Display() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    MovieService.getMovies()
      .then((response) => {
        setMovies(response.data.data.data);
        console.log(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value === "") {
      MovieService.getMovies()
        .then((response) => {
          setMovies(response.data.data.data);
          console.log(response.data.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(event.target.value.toLowerCase() || "")
    );
    setMovies(filteredMovies);
  };

  return (
    <main className=" bg-gradient-to-b from-gray-900 via-gray-900 to-black h-full min-h-screen">
      <div className=" bg-black py-4 px-2 text-center shadow-white-xl w-full">
        <h1 className="text-2xl text-white font-light font-sans">
          Movie Collection
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-8 py-5">
        <input
          type="text"
          className="shadow bg-black text-white border border-slate-100 py-1 px-2 rounded-lg mx-5"
          placeholder=" Search by title . . ."
          value={search}
          onChange={handleSearch}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-5">
          {movies.map((movie) => (
            <ul key={movie.id}>
              <li className="text-white bg-gradient-to-b from-transparent via-gray-900 to-black blur-4 rounded-3xl border-2 mx-6 border-gray-100 relative ">
                <Link to={`/edit/${movie.id}`} className="text-white ">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="lg:w-full rounded-3xl px-2 py-2 object-cover object-top h-96 w-96"
                  />
                  <div className="flex flex-col gap-10 justify-between absolute bottom-0 px-4 py-4 bg-gradient-to-b from-transparent from-1% via-gray-800 via-40% to-black rounded-3xl w-full">
                    <div>
                      <h2 className="text-2xl font-bold">{movie.title}</h2>
                      <h2 className="text-lg font-light">{movie.director}</h2>
                    </div>
                    <div className="justify-items-end flex justify-end flex-wrap">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="text-lg font-light ml-0 border border-white px-2 py-0 rounded-full mx-2 my-1"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          ))}
        </div>
      </div>
      <div>
        <Link
          to="/add"
          className="rounded-full min-w-11 bg-white text-black text-center pt-0 pb-2  font-black text-3xl fixed bottom-5 right-5 shadow-xl"
        >
          +
        </Link>
      </div>
    </main>
  );
}
