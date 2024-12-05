import React from "react";
import { SearchIcon } from '@heroicons/react/solid'; 

const SearchBar = ({ placeholder, onChange }) => {
    return (
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          className="w-full py-2 px-4 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black stroke-[1.5]" />
      </div>
    );
  };

export default SearchBar;
