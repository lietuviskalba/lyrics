// src/components/SearchBar/SearchBar.styled.js
import styled from "styled-components";

// Container for the Search Bar
export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Center the search input */
  width: 100%;
  margin-bottom: 20px; /* Space below the search bar */
  position: relative; /* For positioning the clear button */

  /* Optional: Limit the maximum width for better aesthetics */
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

// Styled Input for Search
export const StyledSearchInput = styled.input`
  padding: 8px 12px;
  padding-right: 30px; /* Space for the clear button */
  border: 1px solid #ccc;
  border-radius: 4px;
  width: ${(props) =>
    props.$fullWidth
      ? "100%"
      : "100%"}; /* Ensure full width within container */
  font-size: 1em;
  color: #333;

  /* Adjust width based on container */
  @media (max-width: 768px) {
    width: 80%;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

// Styled Clear Button
export const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1em;
  color: #aaa;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #333;
  }

  /* Optional: Increase clickable area */
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
