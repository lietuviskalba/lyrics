// src/GlobalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margins and paddings */
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
figure,
blockquote,
dl,
dd,
ul,
ol,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td {
  margin: 0;
  padding: 0;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role="list"],
ol[role="list"] {
  list-style: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  font-family: Arial, sans-serif; /* Ensure consistent font across browsers */
  background-color: #242424; /* Existing background from your index.css */
  color: rgba(
    255,
    255,
    255,
    0.87
  ); /* Existing text color from your index.css */
  padding-top: 30px; /* Equal to navbar height */
}

/* Remove default link styles */
a {
  text-decoration: none;
  color: inherit;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove animations and transitions for people who prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none;
    transition: none;
    scroll-behavior: auto;
  }
}

/* Additional resets */
button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

button:focus {
  outline: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

caption {
  text-align: left;
}

th,
td {
  text-align: left;
  padding: 0.5rem;
}

fieldset {
  border: none;
}

textarea {
  resize: vertical;
}

  /* Global Styles from style.css */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding-top: 30px; /* Equal to navbar height */
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }

  /* Additional global styles from style.css */
  @media (max-width: 768px) {
    .admin-container {
      flex-direction: column;
      gap: 20px;
    }

    .admin-add-song,
    .admin-song-list {
      padding-left: 0;
      border-right: none;
      border-bottom: 1px solid #ccc;
    }

    .songs-page h1 {
      margin-top: 10px; /* Adjust as needed */
    }

    .song-item {
      padding: 10px; /* Reduce padding for smaller screens */
    }
  }

  /* Add any other global styles here */
`;

export default GlobalStyles;
