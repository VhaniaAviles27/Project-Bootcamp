import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./styleSearch.css";
interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onSearch(value);
  };

  return (
    <div className="searchContainer">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input
        type="text"
        onChange={handleChange}
        placeholder="Buscar productos..."
        className="searchInput"
      />
    </div>
  );
};

export default Search;
