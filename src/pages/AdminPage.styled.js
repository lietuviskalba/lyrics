// src/pages/AdminPage.styled.js
import styled from "styled-components";

// Container for the entire Admin Page
export const AdminPageContainer = styled.div`
  margin: 20px;
  color: #fff; /* Ensure visibility on dark background */
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
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
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

export const SongListTitle = styled.h2`
  margin-bottom: 10px;
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
  background-color: #ff4d4d;
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