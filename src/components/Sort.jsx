import React from "react";

const Sort = ({ setSortOption }) => {
  const sortHandler = (event) => {
    setSortOption(event.target.value);
  };
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort" className="text-gray-700">
        Sort :{" "}
      </label>
      <select
        name="sorting"
        id="sort"
        onChange={sortHandler}
        className="px-3 py-2 border border-gray-300 rounded-md"
      >
        <option value="">Select Option</option>
        <option value="HTL">Price : High to Low</option>
        <option value="LTH">Price : Low to High</option>
      </select>
    </div>
  );
};

export default Sort;
