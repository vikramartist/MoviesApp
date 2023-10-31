import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Components/Footer";
import Main from "./Components/Main";
import Navbar from "./Components/Navbar";
import SelectedListOfItems from "./Components/List";
import Loading from "./Components/Loading";
import ErrorMessage from "./Components/ErrorMessage";
import { useLocalStorageState } from "./useLocalStorageState";

const KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectCart, setSelectCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [watched, setWatched] = useLocalStorageState([], "watched");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${searchInput}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          const data = await res.json();
          setData(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (searchInput.length < 3) {
        setData([]);
        setError("");
        return;
      }
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [searchInput]
  );

  const handleListAddition = (movie) => {
    setWatched((watched) => [...watched, movie]);
    setSelectCart(true);
  };

  const handleListDeletion = (movie) => {
    setWatched(watched.filter((mov) => movie.imdbID !== mov.imdbID));
    setSelectCart(false);
  };

  const handleListClose = () => {
    setSelectCart(false);
  };

  const handleListReset = () => {
    setWatched([]);
    localStorage.clear();
    setSelectCart(false);
  };

  return (
    <div className="app">
      <Navbar
        onSearch={setSearchInput}
        Search={searchInput}
        count={data}
        onSelectCart={setSelectCart}
        listCount={watched.length}
      />
      {isLoading && <Loading />}
      {!isLoading && !error && (
        <Main
          movies={data}
          isCartSelected={selectCart}
          onWatched={handleListAddition}
          watched={watched}
          api={KEY}
        />
      )}
      {error && <ErrorMessage message={error} />}
      {selectCart && watched.length > 0 && (
        <SelectedListOfItems
          watched={watched}
          onReset={handleListReset}
          onDelete={handleListDeletion}
          onClose={handleListClose}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
