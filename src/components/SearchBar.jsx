// components/SearchBar.js
import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <input
        type="text"
        className="border border-gray-300 rounded-md py-2 px-4 w-64 mr-2 focus:outline-none"
        placeholder="Search for a city..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button
        className="bg-blue-500 text-white rounded-md py-2 px-4 focus:outline-none"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
