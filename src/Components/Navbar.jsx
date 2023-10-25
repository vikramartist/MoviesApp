/* eslint-disable react/prop-types */
const Navbar = ({ onSearch, count, onSelectCart, search, listCount }) => {
  return (
    <div className="navbar">
      <Logo />
      <Search onSearch={onSearch} search={search} />
      <SearchItemsCount
        data={count}
        onSelectCart={onSelectCart}
        listCount={listCount}
      />
    </div>
  );
};

export function Logo() {
  return (
    <span className="navbar-logo">
      <img
        width="32"
        height="32"
        src="https://img.icons8.com/arcade/64/cinema-.png"
        alt="cinema"
      />
      <p className="text-sm">Movies-App</p>
    </span>
  );
}

export function Search({ onSearch, search }) {
  return (
    <section className="lg:w-4/6 md:w-3/6 sm:w-2/6 ssm:w-3/6">
      <input
        onChange={(e) => onSearch(e.target.value)}
        type="text"
        name="search"
        id="search"
        value={search}
        placeholder="Search movies"
        className="bg-blue-200 text-black border rounded-lg w-full text-sm border-gray-300 p-1"
      />
    </section>
  );
}

export function SearchItemsCount({ data, onSelectCart, listCount }) {
  const length = data?.length;
  return (
    <>
      <span className="rounded-md p-2 flex justify-center">
        <p className="text-sm text-white font-semibold">
          Found {length} movies
        </p>
      </span>
      {listCount > 0 && <List onSelectCart={onSelectCart} count={listCount} />}
    </>
  );
}

export function List({ onSelectCart, count }) {
  return (
    <span
      onClick={() => onSelectCart((curr) => !curr)}
      className="text-white text-sm cursor-pointer hover:bg-blue-200 hover:px-2 hover:shadow-lg hover:rounded-lg"
    >
      List<sup>{count}</sup>
    </span>
  );
}

export default Navbar;
