// src/pages/AdminPage.styled.js
import styled from "styled-components";

// Container for the entire Admin Page
export const AdminPageContainer = styled.div`
  margin: 20px;
  background-color: ${(props) => props.theme.colors.background};
`;

// Title of the Admin Page
export const AdminTitle = styled.h1`
  margin-top: 50px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.text};
`;

// Container for Add Song and Song List
export const AdminContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px; /* Adjust as needed */

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

// Section for Adding Songs
export const AdminAddSong = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 40%; /* Reduced width */
  border-right: 1px solid #ccc; /* Vertical line */
  padding-right: 5%;
  padding-left: 10px; /* Some left padding too */
  margin-right: 0;

  @media (max-width: 768px) {
    flex: 0 0 100%; /* Full width on smaller screens */
    border-right: none;
    padding-right: 0;
    padding-left: 0;
  }
`;

export const AddSongTitle = styled.h2`
  /* Styles for the Add Song title */
  color: ${(props) => props.theme.colors.text};
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 300px; /* Adjust height as needed */
  resize: vertical;
  margin-top: 10px;
  font-size: 14px; /* Adjust font size */
`;

export const ImageUploadSection = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ImageUploadLabel = styled.label`
  /* Styles for the image upload label */
  color: ${(props) => props.theme.colors.text};
`;

export const UploadButton = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ImagePreview = styled.div`
  margin-top: 10px;

  img {
    width: 200px;
    border-radius: 5px;
  }
`;

export const PasteInstruction = styled.p`
  margin-top: 10px;
  font-size: 0.9em;
  color: #ccc;
`;

export const AddSongButton = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #28a745; /* Green for Add */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

// New Styled Component for Update Button
export const UpdateButton = styled.button`
  margin-right: 10px; /* Space between buttons */
  padding: 5px 8px;
  background-color: #ffa500; /* Orange color */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  flex-shrink: 0; /* Prevent button from shrinking */

  &:hover {
    background-color: #ff8c00; /* Darker orange on hover */
  }
`;

// Section for Song List
export const AdminSongList = styled.div`
  flex: 0 0 60%; /* Increased width */
  min-width: 300px; /* Adjust as needed */
  padding-left: 20px;
  color: #fff; /* Ensure text is visible on dark background */

  @media (max-width: 768px) {
    flex: 0 0 100%; /* Full width on smaller screens */
    padding-left: 0;
    margin-top: 20px;
  }
`;

// Wrapper for SongListTitle and SearchBar
export const SongListTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap; /* Allows wrapping on smaller screens */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Title of the Song List
export const SongListTitle = styled.h2`
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.text};
`;

// Container for the search bar
export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px; /* Space between title and search bar */

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
  }
`;

// Styled input for search
export const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
  font-size: 1em;
  color: #333;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SongList = styled.ol`
  list-style-type: none;
  padding-left: 0;
  padding-right: 50px;
  margin: 0;
`;

export const SongItem = styled.li`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  background-color: #323232; /* Dark background */
  position: relative;
  color: #fff;

  &:hover {
    background-color: #1b1c1d;
  }
`;

export const SongMain = styled.div`
  display: flex;
  justify-content: flex-start; /* Align items to the start */
  align-items: center;
  flex-wrap: nowrap; /* Prevent wrapping to keep layout consistent */
`;

export const SongInfo = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

export const DeleteButton = styled.button`
  margin-right: 10px; /* Space between button and song details */
  margin-left: 0; /* Ensure no left margin */
  padding: 5px 8px;
  background-color: #ff4d4d; /* Red for Delete */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  flex-shrink: 0; /* Prevent button from shrinking */

  &:hover {
    background-color: #e60000;
  }
`;

export const SongTitleArtist = styled.span`
  display: flex;
  align-items: center;
  flex-wrap: nowrap; /* Prevent text from wrapping */
  font-weight: bold;
  font-size: 16px;
  color: #b2b2b2;
  word-break: break-word; /* Prevent long titles from breaking layout */

  /* Add a left border as a vertical separator */
  border-left: 1px solid #999;
  padding-left: 10px;
`;

export const SongImage = styled.div`
  flex-shrink: 0; /* Prevent image from shrinking */
  margin-left: auto; /* Pushes the image to the far right */

  img {
    width: 80px; /* Fixed width */
    height: 80px; /* Fixed height */
    object-fit: cover;
    border-radius: 5px;
  }
`;

export const SongExtraInfo = styled.small`
  margin-top: 8px;
  font-size: 12px;
  color: #666;
  text-align: left;
`;

export const SongURLStatus = styled.div`
  margin-left: 10px;
  color: ${(props) => {
    switch (
      props.$status // Changed from props.status to props.$status
    ) {
      case "functional":
        return "#28a745"; // Green
      case "broken":
        return "#dc3545"; // Red
      case "no-url":
      default:
        return "#6c757d"; // Gray
    }
  }};
  font-size: 14px;
  display: flex;
  align-items: center;

  a {
    color: ${(props) => {
      switch (
        props.$status // Changed from props.status to props.$status
      ) {
        case "functional":
          return "#28a745";
        case "broken":
          return "#dc3545";
        case "no-url":
        default:
          return "#6c757d";
      }
    }};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
  }
`;
