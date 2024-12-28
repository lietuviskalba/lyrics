// src/pages/LyricPage.styled.js
import styled from "styled-components";

// Container for the Lyric Page
export const LyricPageContainer = styled.div`
  margin: 20px;
  color: #333;
  background-color: ${(props) => props.theme.colors.background};
`;

// Header section containing title and controls
export const LyricPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* Allows wrapping on smaller screens */
  color: ${(props) => props.theme.colors.text};
`;

// Details about the song (title and artist)
export const SongDetails = styled.div`
  /* Styles for song title and artist */
`;

// Controls container (Random Button, Column Toggle, Text Size)
export const LyricPageControls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 10px; /* Adds spacing on smaller screens */
`;

// Control Button (Column Toggle)
export const ControlButton = styled.button`
  background-color: #1a1a1a;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #333;
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Random Button
export const RandomButton = styled.button`
  background-color: #1a1a1a;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 0.3s, transform 0.2s;
  margin-right: 10px; /* Space between buttons */

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
`;

// Label for Text Size Slider
export const TextSizeLabel = styled.label`
  font-size: 0.9em;
  color: rgb(190, 190, 190);
`;

// Text Size Slider
export const TextSizeSlider = styled.input`
  width: 150px;
`;

// Container for Lyrics
export const LyricsContainer = styled.div`
  margin-top: 20px;
  line-height: 1.6;
  transition: all 0.3s ease-in-out; /* Smooth transition for layout changes */
  font-size: ${(props) => props.$textSize}px;
  color: rgb(212, 210, 210);

  &.columns-1 {
    column-count: 1;
  }

  &.columns-2 {
    column-count: 2;
    column-gap: 40px;
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
    }
  }

  @media (max-width: 768px) {
    &.columns-2::before {
      display: none; /* Remove the vertical separator on small screens */
    }

    &.columns-2 {
      column-count: 1; /* Revert to single column on small screens */
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

// Individual Stanza
export const Stanza = styled.div`
  margin-bottom: 20px;
`;

// Paragraph within a Stanza
export const StanzaParagraph = styled.p`
  margin-bottom: 10px;
`;

// Separator between Stanzas
export const StanzaSeparator = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0;
`;

// Date Added Information
export const DateAdded = styled.p`
  margin-top: 20px;
  font-size: 0.9em;
  color: #666;
`;
