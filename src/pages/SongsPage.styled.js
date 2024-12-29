// src/pages/SongsPage.styled.js
import styled from "styled-components";

// Container for the Songs Page
export const SongsPageContainer = styled.div`
  padding: 10px 20px 20px 20px; /* Top, Right, Bottom, Left */
  font-family: Arial, sans-serif;
  color: #333;
  background-color: ${(props) => props.theme.colors.songsPageBackground};
`;

// Title for the Songs Page
export const SongsPageTitle = styled.h1`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.text};
`;

// Container for SearchBar and Checkbox with Separator
export const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align items to the start */
  gap: 1cm; /* 1 centimeter gap between SearchBar and Separator */
  max-width: 800px; /* Limit the maximum width to prevent checkbox from touching the right edge */
  margin: 0 auto; /* Center the container horizontally */
  margin-bottom: 20px; /* Space below the controls */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack controls vertically on small screens */
    gap: 10px;
    max-width: 100%; /* Full width on small screens */
  }
`;

// Container for the Checkbox
export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

// Styled Checkbox Input
export const CheckboxInput = styled.input`
  margin-right: 8px; /* Space between checkbox and label */
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

// Styled Checkbox Label
export const CheckboxLabel = styled.label`
  font-size: 1em;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
`;

// Vertical Separator
export const VerticalSeparator = styled.div`
  width: 1px; /* Thin vertical line */
  height: 24px; /* Height to match the search bar and checkbox */
  background-color: ${(props) => props.theme.colors.separator};

  @media (max-width: 768px) {
    width: 80%; /* Reduce width on small screens */
    height: 1px; /* Change to horizontal line */
    background-color: ${(props) => props.theme.colors.separator};
  }
`;

// List of songs using CSS Grid
export const SongList = styled.ul`
  list-style: none; /* Remove default bullets */
  padding: 0;
  display: grid;
  grid-template-columns: 1fr auto; /* Two columns: SongBox and SongImage */
  gap: 0px;
  width: auto; /* Allow grid to size based on content */
  margin: 0 auto; /* Center the list */
  border-spacing: 0; /* Remove default spacing */
`;

// Individual song item as a grid row
export const SongItem = styled.li`
  display: contents; /* Allow children to define their own grid areas */
  cursor: pointer;
  background-color: #343131;
  color: #fff;
  border: 1px solid #67676783;
  border-radius: 4px;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #727272; /* Darker grey on hover */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Subtle glow effect */
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column; /* Stack SongBox and SongImage vertically on small screens */
    align-items: flex-start;
    padding: 10px;
    grid-template-columns: 1fr; /* Single column on small screens */
  }
`;

// Container for song title and artist
export const SongBox = styled.div`
  grid-column: 1 / 2; /* Position in first column */
  padding: 15px;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  h3 {
    margin: 0;
    font-size: 1.2em;
    color: ${(props) => props.theme.colors.text};
  }

  p {
    margin: 5px 0 0 0;
    color: ${(props) => props.theme.colors.secondaryText};
  }

  @media (max-width: 768px) {
    padding: 10px 0;
    width: 100%;
  }
`;

// Container for song image
export const SongImage = styled.div`
  grid-column: 2 / 3; /* Position in second column */
  padding: 15px;
  width: 80px; /* Fixed width */
  height: 80px; /* Fixed height */
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover; /* Ensure the image covers the container without distortion */
    border-radius: 5px; /* Rounded corners for the image */
    border: 1px solid #ccc; /* Optional: Add a border around the image */
  }

  @media (max-width: 768px) {
    width: 100%; /* Make image responsive on small screens */
    height: auto; /* Allow height to adjust based on image aspect ratio */

    img {
      width: 100%;
      height: auto; /* Maintain aspect ratio */
    }
  }
`;

// Styled component for "No songs found" message
export const NoSongsMessage = styled.p`
  font-size: 1em;
  color: ${(props) =>
    props.theme.colors.error}; /* Use error color for better visibility */
  text-align: center;
  margin-top: 20px;
`;
