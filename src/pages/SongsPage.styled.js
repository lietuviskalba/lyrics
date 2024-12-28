// src/pages/SongsPage.styled.js
import styled from "styled-components";

// Container for the Songs Page
export const SongsPageContainer = styled.div`
  padding: 10px 20px 20px 20px; /* Top, Right, Bottom, Left */
  font-family: Arial, sans-serif;
  color: #333;
`;

export const SongsPageTitle = styled.h1`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.text};
`;

export const SearchBar = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

export const SearchInput = styled.input`
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const SongList = styled.ul`
  list-style: none; /* Remove default bullets */
  padding: 0;
`;

export const SongItem = styled.li`
  padding: 15px;
  border: 1px solid #67676783;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  display: flex;
  align-items: center;
  background-color: #343131; /* Light grey background for better contrast */
  color: #848484; /* Dark text color for visibility */
  border-radius: 4px; /* Slightly rounded corners */

  &:hover {
    background-color: #727272; /* Darker grey on hover */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Subtle glow effect */
  }

  @media (max-width: 768px) {
    padding: 10px; /* Reduce padding for smaller screens */
  }
`;

export const SongBox = styled.div`
  display: flex;
  flex-direction: column;
`;
