import React from "react";

const Filter = ({ setTitleOption }) => {
  const filterHandler = (event) => {
    setTitleOption(event.target.value);
  };
  return (
    <div className="flex items-center">
      <label htmlFor="filter" className="text-gray-700">
        Filter by :{" "}
      </label>
      <select
        name="filter"
        id="filter"
        className="ml-2 px-3 py-2 border border-gray-300 rounded-md"
        onChange={filterHandler}
      >
        <option value="">Select Option</option>
        <option value="men">Mens</option>
        <option value="women">Women</option>
        <option value="kid">Kids</option>
      </select>
    </div>
  );
};

export default Filter;
