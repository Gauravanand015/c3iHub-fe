import React from "react";

const Search = ({ setSearchOption }) => {
  const searchHandler = (event) => {
    setSearchOption(event.target.value);
  };
  return (
    <div className="flex items-center">
      <input
        type="search"
        id="search"
        placeholder="Search Product"
        // value={searchValue}
        className="ml-2 w-[400px] px-3 py-2  border-b rounded-md focus:outline-none"
        onChange={searchHandler}
      />
    </div>
  );
};

export default Search;
