// src/pages/SongsPage.styled.js
import styled from "styled-components";

// Container for the Songs Page
export const SongsPageContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
  background-color: ${(props) =>
    props.theme.colors.songsPageBackground || "#f5f5f5"};
`;

// Title for the Songs Page
export const SongsPageTitle = styled.h1`
  text-align: center;
  margin: 20px 0;
  color: ${(props) => props.theme.colors.text || "#333"};
`;

// Container for SearchBar and Checkbox with Separator
export const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Centered for better aesthetics */
  gap: 1cm;
  max-width: 800px;
  margin: 0 auto 20px auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    max-width: 100%;
  }
`;

// Container for the Checkbox
export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

// Styled Checkbox Input
export const CheckboxInput = styled.input`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

// Styled Checkbox Label
export const CheckboxLabel = styled.label`
  font-size: 1em;
  color: ${(props) => props.theme.colors.text || "#333"};
  cursor: pointer;
`;

// Vertical Separator
export const VerticalSeparator = styled.div`
  width: 1px;
  height: 24px;
  background-color: ${(props) => props.theme.colors.separator || "#ccc"};

  @media (max-width: 768px) {
    width: 80%;
    height: 1px;
    background-color: ${(props) => props.theme.colors.separator || "#ccc"};
  }
`;

// List of songs using CSS Grid
export const SongList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-auto-rows: auto;
  gap: 10px;
  width: fit-content; /* Adjust based on content */
  margin: 0 auto;
`;

// Individual song item as a grid row with two columns
export const SongItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 80px; /* SongBox and SongImage */
  align-items: center;
  background-color: #343131;
  color: #fff;
  border: 1px solid #67676783;
  border-radius: 4px;
  padding: 15px;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #727272;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Stack vertically */
    padding: 10px;
  }
`;

// Container for song title and artist
export const SongBox = styled.div`
  display: flex;
  flex-direction: column;
  white-space: normal; /* Allows text to wrap */
  overflow: visible; /* Ensures content is visible */

  h3 {
    margin: 0;
    font-size: 1.2em;
    color: #fff;
  }

  p {
    margin: 5px 0 0 0;
    color: #ddd;
  }

  @media (max-width: 768px) {
    padding: 10px 0;
    width: 100%;
  }
`;

// Container for song image
export const SongImage = styled.div`
  padding: 0 15px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;

    img {
      width: 100%;
      height: auto;
    }
  }
`;

// Styled component for "No songs found" message
export const NoSongsMessage = styled.p`
  font-size: 1em;
  color: #ff4d4f; /* Red color for visibility */
  text-align: center;
  margin-top: 20px;
`;
