// src/pages/SongsPage.styled.js
import styled from "styled-components";

// Container for the Songs Page
export const SongsPageContainer = styled.div`
  padding: 10px 20px 20px 20px; /* Top, Right, Bottom, Left */
  font-family: Arial, sans-serif;
  color: #333;
  background-color: ${(props) => props.theme.colors.background};
`;

export const SongsPageTitle = styled.h1`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.text};
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
  justify-content: space-between; /* Distribute space between text and image */
  background-color: #343131; /* Dark background for better contrast */
  color: #fff; /* White text for visibility */
  border-radius: 4px; /* Slightly rounded corners */

  &:hover {
    background-color: #727272; /* Darker grey on hover */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Subtle glow effect */
  }

  @media (max-width: 768px) {
    padding: 10px; /* Reduce padding for smaller screens */
    flex-direction: column; /* Stack elements vertically on small screens */
    align-items: flex-start; /* Align items to the start */
  }
`;

export const SongBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%; /* Limit the width to accommodate the image */

  @media (max-width: 768px) {
    max-width: 100%; /* Full width on smaller screens */
  }

  h3 {
    margin: 0;
    font-size: 1.2em;
    color: ${(props) => props.theme.colors.text};
  }

  p {
    margin: 5px 0 0 0;
    color: ${(props) => props.theme.colors.secondaryText};
  }
`;

export const SongImage = styled.div`
  flex-shrink: 0; /* Prevent image from shrinking */
  margin-left: 20px; /* Space between text and image */

  img {
    width: 80px; /* Fixed width */
    height: 80px; /* Fixed height */
    object-fit: cover; /* Ensure the image covers the container without distortion */
    border-radius: 5px; /* Rounded corners for the image */
    border: 1px solid #ccc; /* Optional: Add a border around the image */
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px; /* Space above the image when stacked vertically */
    width: 100%; /* Make image responsive */
    img {
      width: 100%;
      height: auto; /* Maintain aspect ratio */
    }
  }
`;

// Optional: Styled component for "No songs found" message
export const NoSongsMessage = styled.p`
  font-size: 1em;
  color: #ccc;
  text-align: center;
  margin-top: 20px;
`;
