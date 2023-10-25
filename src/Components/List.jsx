import { Button } from "./Main";

/* eslint-disable react/prop-types */
const SelectedListOfItems = ({ watched, onReset, onDelete, onClose }) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <ul className="list container-snap">
        <button
          onClick={() => onClose()}
          className="text-red-500 lg:text-lg md:text-md sm:text-sm ssm:text-[1rem] self-end mx-2"
        >
          Close
        </button>
        {watched.map((movie) => (
          <Item watched={movie} key={movie.imdbID} onDelete={onDelete} />
        ))}
        <Button onClick={onReset}>
          <h5 className="lg:text-lg md:text-md sm:text-sm ssm:text-[0.6rem]">
            Remove All
          </h5>
        </Button>
      </ul>
    </div>
  );
};

export function Item({ watched, onDelete }) {
  return (
    <li className="flex my-2 px-2 items-center justify-around border-blue-600 shadow-lg shadow-white rounded-md w-3/4 h-[5rem]">
      <img
        src={watched.image}
        alt={watched.title}
        className="h-3/4 w-[5rem] brightness-120 rounded-md"
      />
      <article className="text-white flex flex-col items-center justify-evenly w-[20rem]">
        <span className="lg:text-[0.9rem] md:text-[0.8rem] sm:text-[0.7rem] ssm:text-[0.5rem] font-bold">
          <i>{watched.title}</i>
        </span>
        <aside className="flex flex-row justify-between items-center w-3/4">
          <span className="lg:text-[0.9rem] md:text-[0.8rem] sm:text-[0.7rem] ssm:text-[0.5rem]">
            Runtime - {watched.runtime} min
          </span>
          <span className="lg:text-[0.9rem] md:text-[0.8rem] sm:text-[0.7rem] ssm:text-[0.5rem]">
            Rating - ✨{watched.imdbRating}
          </span>
        </aside>
      </article>
      <Button onClick={() => onDelete(watched)}>
        <h6 className="lg:text-lg md:text-[0.8rem] sm:text-[0.7rem] ssm:text-[0.5rem]">
          Delete
        </h6>
      </Button>
    </li>
  );
}

export default SelectedListOfItems;
