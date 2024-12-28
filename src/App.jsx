import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import GlobalStyles from "./GlobalStyles.js";
import Navbar from "./components/Navbar";
import SongsPage from "./pages/SongsPage.jsx";
import LyricPage from "./pages/LyricPage";
import AdminPage from "./pages/AdminPage";

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
