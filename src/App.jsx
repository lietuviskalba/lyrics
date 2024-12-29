// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import GlobalStyles from "./GlobalStyles.js";
import Navbar from "./components/Navbar";
import SongsPage from "./pages/SongsPage.jsx";
import LyricPage from "./pages/LyricPage";
import AdminPage from "./pages/AdminPage";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <ErrorBoundary>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/songs" replace />} />{" "}
            {/* Redirect to /songs */}
            <Route path="/songs" element={<SongsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/lyrics/:id" element={<LyricPage />} />{" "}
            {/* Dynamic Route */}
            <Route path="*" element={<div>404 Not Found</div>} />{" "}
            {/* Fallback for unmatched routes */}
          </Routes>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
};

export default App;
