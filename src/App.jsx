import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles.js";
import Navbar from "./components/Navbar";
import SongsPage from "./pages/SongsPage.jsx";
import LyricPage from "./pages/LyricPage";
import AdminPage from "./pages/AdminPage";

const theme = {
  colors: {
    primary: "#333",
    secondary: "#ff4d4d",
    text: "#fff",
    hover: "#0056b3",
    background: "#f0f0f0",
  },
  spacing: {
    padding: "5px 20px",
    margin: "0 10px",
  },
  fontSize: {
    link: "16px",
  },
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LyricPage />} />
          <Route path="/songs" element={<SongsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/lyrics" element={<LyricPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
