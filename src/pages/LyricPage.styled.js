// src/pages/LyricPage.styled.js
import styled from "styled-components";

// Container for the Lyric Page
export const LyricPageContainer = styled.div`
  margin: 20px;
  color: #333;
  background-color: ${(props) => props.theme.colors.background};
  font-family: Arial, sans-serif;
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
  /* Additional styles can be added here if needed */
  h2 {
    margin: 0;
    font-size: 2em;
    color: ${(props) => props.theme.colors.primary};
  }

  h3 {
    margin: 5px 0 0 0;
    font-weight: normal;
    color: ${(props) => props.theme.colors.secondaryText};
  }
`;

// Controls container (YouTube Player, Random Button, Column Toggle, Text Size)
export const LyricPageControls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 10px; /* Adds spacing on smaller screens */

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
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

// Container for YouTube Player and Play/Stop Button
export const YouTubeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px; /* Space between YouTube player and Random button */

  @media (max-width: 600px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

// Play/Stop Button
export const PlayStopButton = styled.button`
  margin-left: 10px;
  background-color: #1a1a1a;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s, transform 0.2s;

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

// **New Styled Components for Lyrics**

export const LyricLine = styled.p`
  margin: 5px 0;
  color: ${(props) => props.theme.colors.text};
  font-size: 1.5em;
`;

export const RomajiLine = styled.p`
  margin: 3px 0 5px 0;
  color: ${(props) => props.theme.colors.romaji};
  font-size: 0.8em;
`;

export const TranslationLine = styled.p`
  margin: 0 0 10px 0;
  color: ${(props) => props.theme.colors.translation};
  font-size: 0.6em;
`;
