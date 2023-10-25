import { useEffect, useState } from "react";
import Loading from "./Loading";

/* eslint-disable react/prop-types */
const Main = ({ movies, isCartSelected, onWatched, watched }) => {
  const [selectedID, setSelectedID] = useState(null);

  const handleSelection = (id) => {
    setSelectedID((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedID(null);
  };

  return (
    <main className={isCartSelected ? "main blur-sm" : "main"}>
      <ContentBar
        movies={movies}
        onSelect={handleSelection}
        selectMovie={selectedID}
      />
      {selectedID && (
        <SideBar
          data={selectedID}
          onClose={setSelectedID}
          onWatched={onWatched}
          watched={watched}
          closeMovie={handleCloseMovie}
        />
      )}
    </main>
  );
};

export function ContentBar({ movies, onSelect, selectMovie }) {
  return (
    <div className="h-screen bg-black-50 w-full p-2">
      <MovieList
        movies={movies}
        onSelect={onSelect}
        selectMovie={selectMovie}
      />
    </div>
  );
}

export function MovieList({ movies, onSelect, selectMovie }) {
  return (
    <ul className="movie-list container-snap">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelect={onSelect}
          selectMovie={selectMovie}
        />
      ))}
    </ul>
  );
}

export function Movie({ movie, onSelect, selectMovie }) {
  const isSelected = movie.imdbID === selectMovie;
  return (
    <li
      onClick={() => onSelect(movie.imdbID)}
      className={isSelected ? "movie active" : "movie"}
    >
      <img
        src={movie?.Poster}
        alt={movie?.Title}
        className="w-full h-full brightness-125"
      />
    </li>
  );
}

export function SideBar({ data, onClose, onWatched, watched, closeMovie }) {
  const [currMovie, setCurrMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isWatched = watched.map((movie) => movie.imdbID).includes(data);

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: data,
      title: currMovie.Title,
      imdbRating: Number(currMovie.imdbRating),
      runtime: Number(currMovie.Runtime.split(" ").at(0)),
      image: currMovie.Poster,
    };
    {
      !isWatched && onWatched(newWatchedMovie);
    }
    closeMovie();
  };

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          closeMovie();
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [closeMovie]
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=c73a1211&i=${data}`
        );
        const details = await res.json();
        setCurrMovie(details);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [data]
  );

  useEffect(() => {
    if (!currMovie.Title) return;
    document.title = `Movie | ${currMovie.Title}`;

    return function () {
      document.title = "Movies App";
    };
  }, [currMovie.Title]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="sidebar">
          <BottomSideBar
            movie={currMovie}
            onClose={onClose}
            onWatched={handleAdd}
            isWatched={isWatched}
          />
        </div>
      )}
    </>
  );
}

export function BottomSideBar({ movie, onClose, onWatched, isWatched }) {
  return (
    <section className="h-full w-full bg-black p-4">
      <button
        onClick={() => onClose(null)}
        className="bg-transparent text-lg shadow-white shadow-md"
      >
        ⬅
      </button>
      <h3 className="text-teal-400 text-[1rem] text-center">{movie?.Title}</h3>
      <aside className="float-right w-full">
        <img
          className="relative float-left text-white lg:w-[7rem] lg:h-[8rem] md:w-[5.5rem] md:h-[7rem] sm:w-[5rem] sm:h-[6rem] ssm:w-full ssm:h-[5.6rem] brightness-125 rounded-lg"
          src={movie.Poster}
          alt={movie.Poster}
        />
        <article className="float-right mt-1 flex flex-wrap lg:w-[10rem] md:w-[7rem] sm:w-[6rem] ssm:w-full text-white xl:text-[0.8rem] lg:text-[0.7rem] md:text-[0.65rem] sm:text-[0.55rem] ssm:text-[0.48rem]">
          {movie.Released && (
            <span className="w-full">Released - {movie.Released}</span>
          )}
          {movie.Language && (
            <p className="w-full">Language - {movie.Language}</p>
          )}
          {movie.Genre && <h5 className="w-full">{movie.Genre}</h5>}
          {movie.Runtime && (
            <span className="w-full">Duration - {movie.Runtime}</span>
          )}
          {movie.imdbRating && (
            <span className="w-full">IMDB Rating - {movie.imdbRating}</span>
          )}
          {movie.BoxOffice && (
            <span className="w-full">BoxOffice - {movie.BoxOffice}</span>
          )}
          {movie.Meta_score && (
            <span className="w-full">Meta Score - {movie.Meta_score}/100</span>
          )}
          {movie.Awards && (
            <span className="w-full">Awards - {movie.Awards}</span>
          )}
          <h6 className="w-full">
            <i>Directed by </i>
            {movie.Director}
          </h6>
        </article>
      </aside>
      <span className="text-xl text-center text-white xl:text-[1rem] lg:text-[0.9rem] md:text-[0.8rem] sm:text-[0.7rem] ssm:text-[0.6rem]">
        Cast
      </span>
      <ul className="text-white xl:text-[1rem] lg:text-[0.7rem] md:text-[0.65rem] sm:text-[0.55rem] ssm:text-[0.48rem]">
        {movie?.Actors?.split(",").map((actors) => (
          <li key={actors}>{actors}</li>
        ))}
      </ul>
      <span className="text-xl text-center text-white xl:text-[1rem] lg:text-[0.9rem] md:text-[0.8rem] sm:text-[0.7rem] ssm:text-[0.6rem]">
        Writers
      </span>
      <ul className="text-white xl:text-[1rem] lg:text-[0.7rem] md:text-[0.65rem] sm:text-[0.55rem] ssm:text-[0.48rem]">
        {movie?.Writer?.split(",").map((writers) => (
          <li key={writers}>{writers}</li>
        ))}
      </ul>
      <p className="w-full flex flex-wrap text-lime-200 xl:text-[1rem] lg:text-[0.7rem] md:text-[0.65rem] sm:text-[0.55rem] ssm:text-[0.48rem]">
        {movie.Plot}
      </p>
      {!isWatched ? (
        <Button onClick={onWatched}>
          <h5>+ Add to List</h5>
        </Button>
      ) : (
        <p className="text-white bg-slate-300 text-center xl:text-[1rem] lg:text-[0.9rem] md:text-[0.8rem] sm:text-[0.7rem] ssm:text-[0.6rem]">
          Added to the list
        </p>
      )}
    </section>
  );
}

export function Button({ children, onClick }) {
  return (
    <button
      onClick={() => onClick()}
      className="bg-red-500 text-sm p-1 mt-1 flex items-center justify-center rounded-lg text-white shadow-md hover:-translate-y-1 hover:shadow-red-300"
    >
      {children}
    </button>
  );
}

export default Main;
