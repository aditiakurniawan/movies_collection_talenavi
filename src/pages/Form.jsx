import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieService from "../services/MovieService";
import { Multiselect } from "multiselect-react-dropdown";

export default function Form() {
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      MovieService.getMovie(id)
        .then((response) => {
          setMovie(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    MovieService.getGenres().then((response) => {
      setGenres(response.data.data.data);
    });
  }, []);

  const handleChange = (event) => {
    console.log(event);
    setMovie({
      ...movie,
      [event.target.name]: event.target.value,
    });
  };

  const handleAdd = (event) => {
    event.preventDefault();
    MovieService.addMovie(movie)
      .then((response) => {
        console.log(response.data);
        alert("Movie added successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    MovieService.updateMovie(id, movie)
      .then((response) => {
        console.log(response.data);
        alert("Movie updated successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    MovieService.deleteMovie(id)
      .then((response) => {
        console.log(response.data);
        alert("Movie deleted successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className=" bg-gradient-to-b from-gray-900 via-gray-900 to-black h-screen">
      <div className=" bg-black py-4 px-4 shadow-white-xl flex justify-between md:px-20 w-full lg:px-40">
        <Link to="/" className=" text-white font-light font-sans">
          Home
        </Link>
        <div className="flex justify-end">
          <button
            className="text-white bg-red-800 border border-white rounded-lg px-3 pb-1"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="text-white  border border-white rounded-lg px-4 ml-3 pb-1"
            onClick={id ? handleEdit : handleAdd}
          >
            Save
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-6 py-10 md:w-3/4 md:my-20 mx-auto lg:w-1/3">
        <input
          type="text"
          className="shadow bg-black text-white border border-slate-100 py-3 px-2 rounded-lg "
          placeholder=" Title . . ."
          name="title"
          value={movie.title || ""}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className="shadow bg-black text-white border border-slate-100 py-3 px-2 rounded-lg "
          placeholder=" Director . . ."
          name="director"
          value={movie.director || ""}
          onChange={handleChange}
          required
        />
        <textarea
          cols="20"
          rows="5"
          type="text"
          className="shadow bg-black text-white border border-slate-100 py-3 px-2 rounded-lg "
          placeholder=" Summary . . ."
          name="summary"
          value={movie.summary || ""}
          onChange={handleChange}
          required
        />
        <Multiselect
          required
          className="rounded-lg lg:w-auto sm:mx-auto sm:w-80 md:w-full  w-auto mx-auto"
          onKeyPressFn={function noRefCheck() {}}
          onSearch={function noRefCheck() {}}
          onRemove={(event) => {
            movie.genre = event.map((genre) => genre.name);
          }}
          onSelect={(event) => {
            movie.genre = event.map((genre) => genre.name);
          }}
          options={genres}
          displayValue="name"
          selectedValues={movie.genres || movie.genre}
          style={{
            chips: {
              background: "#1a1a1a",
              color: "white",
              border: "1px solid white",
              borderRadius: "20px",
            },
            multiselectContainer: {
              color: "white",
              background: "black",
            },
            searchBox: {
              border: "1px solid white",
              borderBottom: "1px solid white",
              borderRadius: "10px",
            },
            optionContainer: {
              background: "black",
            },
          }}
        />
      </div>
    </main>
  );
}
