// src/pages/LyricPage.styled.js
import styled, { css } from "styled-components";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowUp,
  FaCompress,
  FaExpand,
} from "react-icons/fa";

// Container for the Lyric Page
export const LyricPageContainer = styled.div`
  margin: 20px;
  color: #333;
  background-color: ${(props) => props.theme.colors.background};
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative; /* For positioning Return to Top at bottom */
`;

// Header section containing title and controls
export const LyricPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* Allows wrapping on smaller screens */
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 20px; /* Added spacing below the header */
`;

// Details about the song (title and artist)
export const SongDetails = styled.div`
  text-align: left;

  h2 {
    margin: 0;
    font-size: 3em; /* Further increased font size */
    color: ${(props) => props.theme.colors.primary};
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Enhanced shadow */
    font-weight: bold; /* Bold text */
  }

  h3 {
    margin: 10px 0 0 0; /* Added top margin for spacing */
    font-weight: bold; /* Bold text */
    color: ${(props) => props.theme.colors.secondaryText};
    font-size: 2em; /* Further increased font size */
  }
`;

// Container for YouTube Player
export const YouTubeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Center the YouTube player */
  margin: 0 auto; /* Center horizontally */
  flex: 1; /* Allow it to grow and center within the header */

  iframe {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border: 2px solid #ccc; /* Added subtle border */
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
  }
`;

// Fixed Controls Box
export const ControlsBox = styled.div`
  position: fixed;
  top: 80px; /* Adjust based on your navbar height */
  right: 20px;
  background-color: rgba(
    26,
    26,
    26,
    0.9
  ); /* Semi-transparent dark background */
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  z-index: 1000; /* Ensures the box stays above other elements */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: transform 0.3s ease-in-out;
  width: ${(props) => (props.$isCollapsed ? "50px" : "200px")};
  height: ${(props) => (props.$isCollapsed ? "50px" : "auto")};
  overflow: hidden;

  @media (max-width: 768px) {
    top: auto;
    bottom: 20px;
    right: 50%;
    transform: translateX(-50%);
    flex-direction: row;
    gap: 15px;
    width: ${(props) => (props.$isCollapsed ? "50px" : "90%")};
  }

  ${(props) =>
    props.$isCollapsed &&
    css`
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 50px;
      padding: 10px;
    `}
`;

// Collapse/Expand Button
export const CollapseButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

// Control Button (Column Toggle)
export const ControlButton = styled.button`
  background-color: #1a1a1a;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 0.3s, transform 0.2s;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #333;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: auto;
  }
`;

// Random Button
export const RandomButton = styled.button`
  background-color: #1a1a1a;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 0.3s, transform 0.2s;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #333;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: auto;
  }
`;

// Play/Stop Button
export const PlayStopButton = styled.button`
  background-color: #1a1a1a;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s, transform 0.2s;
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #333;
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Text Size Control Container
export const TextSizeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;

  @media (max-width: 768px) {
    width: auto;
  }
`;

// Label for Text Size Slider
export const TextSizeLabel = styled.label`
  font-size: 0.9em;
  color: rgb(190, 190, 190);
`;

// Text Size Slider
export const TextSizeSlider = styled.input`
  width: 100%;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100px;
  }
`;

// Container for Lyrics with Enhanced Transitions
export const LyricsContainer = styled.div`
  margin-top: 40px;
  line-height: ${(props) =>
    props.$isCompact ? "1.2" : "1.8"}; /* Reduced line-height in compact mode */
  transition: all 0.5s ease-in-out; /* Increased transition duration for smoothness */
  font-size: ${(props) => props.$textSize}px;
  color: rgb(212, 210, 210);
  padding: ${(props) =>
    props.$isCompact ? "10px" : "20px"}; /* Adjust padding based on isCompact */

  &.columns-1 {
    column-count: 1;
    column-gap: ${(props) =>
      props.$isCompact ? "10px" : "20px"}; /* Adjust gap */
  }

  &.columns-2 {
    column-count: 2;
    column-gap: ${(props) =>
      props.$isCompact ? "20px" : "40px"}; /* Adjust gap */
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      width: 1px;
      height: 100%;
      background-color: #ccc;
      transform: translateX(-50%);
      transition: opacity 0.5s ease-in-out; /* Smooth transition for separator */
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    &.columns-2::before {
      display: none; /* Remove the vertical separator on small screens */
      opacity: 0;
    }

    &.columns-2 {
      column-count: 1; /* Revert to single column on small screens */
      column-gap: ${(props) =>
        props.$isCompact ? "10px" : "20px"}; /* Adjust gap */
    }
  }

  /* Add fade-in effect when selectedSong changes */
  opacity: 0;
  animation: fadeIn 0.5s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

// Individual Stanza with Rectangle Bubble Styling
export const Stanza = styled.div`
  margin-bottom: ${(props) =>
    props.$isCompact ? "10px" : "20px"}; /* Adjust margin */
  padding: ${(props) =>
    props.$isCompact ? "10px" : "20px"}; /* Adjust padding */
  background-color: rgba(
    255,
    255,
    255,
    0.1
  ); /* Light semi-transparent background */
  border: 2px solid #444; /* Thicker dark border for contrast */
  border-radius: 12px;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.1);

  /* Prevent the stanza from being split across columns */
  break-inside: avoid;
  page-break-inside: avoid;
  -webkit-column-break-inside: avoid; /* Safari */

  /* Reduce margins between lines */
  & > p {
    margin: ${(props) => (props.$isCompact ? "2px 0" : "5px 0")};
  }
`;

// Removed StanzaSeparator to eliminate unwanted horizontal lines within bubbles
// export const StanzaSeparator = styled.hr`
//   border: none;
//   border-top: 1px solid #ccc;
//   margin: ${(props) =>
//     props.isCompact ? "5px 0" : "10px 0"}; /* Reduced margin in compact mode */
// `;

// Date Added Information
export const DateAdded = styled.p`
  margin-top: 30px;
  font-size: 1em;
  color: #666;
  text-align: right;
`;

// **Styled Components for Lyrics**

export const LyricLine = styled.p`
  margin: ${(props) =>
    props.$isCompact ? "2px 0" : "5px 0"}; /* Reduced margin in compact mode */
  color: ${(props) => props.theme.colors.lyric}; /* Brightest color */
  font-size: ${(props) =>
    props.isCompact
      ? "1.3em"
      : "1.5em"}; /* Slightly smaller font size in compact mode */
  font-weight: bold;
`;

export const RomajiLine = styled.p`
  margin: ${(props) =>
    props.$isCompact ? "1px 0" : "3px 0"}; /* Reduced margin in compact mode */
  color: ${(props) => props.theme.colors.romaji}; /* Less bright color */
  font-size: ${(props) =>
    props.isCompact
      ? "1em"
      : "1.2em"}; /* Slightly smaller font size in compact mode */
`;

export const TranslationLine = styled.p`
  margin: ${(props) =>
    props.isCompact
      ? "1px 0 4px 0"
      : "3px 0 8px 0"}; /* Reduced margin in compact mode */
  color: ${(props) => props.theme.colors.translation}; /* Least bright color */
  font-size: ${(props) =>
    props.isCompact
      ? "0.9em"
      : "1em"}; /* Slightly smaller font size in compact mode */
`;

// **Return to Top Button Inside Controls Box**
export const ReturnToTopButton = styled.button`
  background-color: #1a1a1a;
  color: white;
  border: none;
  padding: 8px 12px; /* Adjusted padding for rectangular shape */
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 0.3s, transform 0.2s;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #333;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: auto;
  }
`;

// **Return to Top Button at Bottom of Page**
export const BottomReturnToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1a1a1a;
  color: white;
  border: none;
  padding: 12px 24px; /* Wide rectangle shape */
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2em;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s, transform 0.2s, opacity 0.3s;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #333;
    opacity: 1;
  }

  &:active {
    transform: translateX(-50%) scale(0.95);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 1em;
    bottom: 15px;
  }

  span {
    margin-left: 8px; /* Spacing between icon and text */
  }
`;

// **Shrink Button**
export const ShrinkButton = styled.button`
  background-color: #1a1a1a;
  color: white;
  border: none;
  padding: 8px 12px; /* Adjusted padding for rectangular shape */
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 0.3s, transform 0.2s;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #333;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: auto;
  }
`;
