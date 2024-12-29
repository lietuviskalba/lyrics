// src/pages/SongsPage.styled.js
import styled from "styled-components";

// Container for the Songs Page
export const SongsPageContainer = styled.div`
  padding: 10px 20px 20px 20px; /* Top, Right, Bottom, Left */
  font-family: Arial, sans-serif;
  color: #333;
  background-color: ${(props) => props.theme.colors.background};
`;

// Title for the Songs Page
export const SongsPageTitle = styled.h1`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.text};
`;

// List of songs using Flexbox
export const SongList = styled.ul`
  list-style: none; /* Remove default bullets */
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to start to determine container width based on content */
  width: max-content; /* Make the width determined by the widest SongItem */
  margin: 0 auto; /* Center the list */
`;

// Individual song item as a flex container
export const SongItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between SongBox and SongImage */
  background-color: #343131; /* Dark background for better contrast */
  color: #fff; /* White text for visibility */
  padding: 15px;
  border: 1px solid #67676783;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  width: 100%; /* Make SongItem take full width of SongList */
  gap: 20px; /* Add gap between SongBox and SongImage */

  &:hover {
    background-color: #727272; /* Darker grey on hover */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Subtle glow effect */
  }

  @media (max-width: 768px) {
    flex-direction: column; /* Stack SongBox and SongImage vertically on small screens */
    align-items: flex-start; /* Align items to the start */
    padding: 10px;
    width: 100%; /* Full width on small screens */
    gap: 10px; /* Reduce gap on small screens */
  }
`;

// Container for song title and artist
export const SongBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Allow SongBox to take available space */

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
    width: 100%; /* Full width on small screens */
    margin-bottom: 10px; /* Add bottom margin for spacing */
  }
`;

// Container for song image
export const SongImage = styled.div`
  width: 80px; /* Fixed width */
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
  color: #ccc;
  text-align: center;
  margin-top: 20px;
`;
