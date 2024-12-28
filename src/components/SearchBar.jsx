// src/components/SearchBar/SearchBar.jsx
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import {
  SearchBarContainer,
  StyledSearchInput,
  ClearButton,
} from "./SearchBar.styled";

const SearchBar = ({
  placeholder,
  onSearch,
  initialValue = "",
  fullWidth = false,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    // Cancel debounce on unmount
    return debouncedSearch.cancel;
  }, [searchTerm, debouncedSearch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch(""); // Optionally trigger search with empty string
  };

  return (
    <SearchBarContainer>
      <StyledSearchInput
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        aria-label="Search songs by name or artist"
        $fullWidth={fullWidth}
      />
      {searchTerm && (
        <ClearButton onClick={handleClear} aria-label="Clear search input">
          &#x2715; {/* Unicode character for '×' */}
        </ClearButton>
      )}
    </SearchBarContainer>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default SearchBar;
