import React from "react";
import Sort from "./Sort";
import Search from "./Search";
import Filter from "./Filter";

const FilterBar = ({ setSortOption, setTitleOption, setSearchOption }) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 rounded-md p-4">
      <div className="flex items-center space-x-4">
        <Sort setSortOption={setSortOption} />
      </div>
      <div>
        <Search setSearchOption={setSearchOption} />
      </div>
      <div>
        <Filter setTitleOption={setTitleOption} />
      </div>
    </div>
  );
};

export default FilterBar;
