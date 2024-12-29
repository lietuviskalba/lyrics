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

// List of songs using Flexbox
export const SongList = styled.ul`
  list-style: none; /* Remove default bullets */
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to start to determine container width based on content */
  max-width: 1000px; /* Optional: Limit the maximum width */
  margin: 0 auto; /* Center the list */
`;

// Individual song item as a flex container
export const SongItem = styled.li`
  display: flex;
  justify-content: space-between; /* Space between SongBox and SongImage */
  align-items: center; /* Vertically center items */
  background-color: #343131; /* Dark background for better contrast */
  color: #fff; /* White text for visibility */
  padding: 15px;
  border: 1px solid #67676783;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  width: 100%; /* Inherit width from SongList */

  &:hover {
    background-color: #727272; /* Darker grey on hover */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Subtle glow effect */
  }

  @media (max-width: 768px) {
    flex-direction: column; /* Stack SongBox and SongImage vertically on small screens */
    align-items: flex-start; /* Align items to the start */
    padding: 10px;
  }
`;

// Container for song title and artist
export const SongBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Allow SongBox to take available space */
  margin-right: 20px; /* Space between SongBox and SongImage */

  h3 {
    margin: 0;
    font-size: 1.2em;
    color: ${(props) => props.theme.colors.text};
    white-space: nowrap; /* Prevent text from wrapping */
    overflow: hidden; /* Hide overflow text */
    text-overflow: ellipsis; /* Add ellipsis for overflow text */
  }

  p {
    margin: 5px 0 0 0;
    color: ${(props) => props.theme.colors.secondaryText};
    white-space: nowrap; /* Prevent text from wrapping */
    overflow: hidden; /* Hide overflow text */
    text-overflow: ellipsis; /* Add ellipsis for overflow text */
  }

  @media (max-width: 768px) {
    margin-right: 0; /* Remove right margin on small screens */
    margin-bottom: 10px; /* Add bottom margin for spacing */
    width: 100%; /* Full width on small screens */
  }
`;

// Container for song image
export const SongImage = styled.div`
  width: 80px; /* Fixed width */
  height: 80px; /* Fixed height */
  flex-shrink: 0; /* Prevent image from shrinking */
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
