// src/main.jsx

(function () {
  // Preserve the original console methods
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  // Set to track suppressed error messages
  const suppressedErrors = new Set();

  // Define patterns of error messages to suppress
  const ignoreErrorPatterns = [
    /browser is not defined/,
    /ERR_BLOCKED_BY_CLIENT/,
    /adblock-yt-cs\.js/,
    /generate_204/,
    /youtubei\/v1\/log_event/,
    /play\.google\.com\/log/,
    // Add more patterns as needed
  ];

  // **Override console.error**
  console.error = (...args) => {
    const message = args[0];
    if (typeof message === "string") {
      const shouldIgnore = ignoreErrorPatterns.some((pattern) =>
        pattern.test(message)
      );
      if (shouldIgnore) {
        if (!suppressedErrors.has(message)) {
          originalConsoleWarn(
            "AdBlock Warning: An ad blocker-related error was suppressed."
          );
          suppressedErrors.add(message);
        }
        // Do not call the original console.error for ignored messages
        return;
      }
    }
    // For all other errors, call the original console.error
    originalConsoleError(...args);
  };

  // **Override window.onerror**
  window.onerror = function (message, source, lineno, colno, error) {
    if (typeof message === "string") {
      const shouldIgnore = ignoreErrorPatterns.some((pattern) =>
        pattern.test(message)
      );
      if (shouldIgnore) {
        if (!suppressedErrors.has(message)) {
          originalConsoleWarn(
            "AdBlock Warning: An ad blocker-related error was suppressed."
          );
          suppressedErrors.add(message);
        }
        // Prevent the default browser error handler
        return true;
      }
    }
    // For all other errors, allow the default handler
    return false;
  };

  // **Override window.onunhandledrejection**
  window.onunhandledrejection = function (event) {
    const message =
      event.reason && event.reason.message ? event.reason.message : "";
    if (typeof message === "string") {
      const shouldIgnore = ignoreErrorPatterns.some((pattern) =>
        pattern.test(message)
      );
      if (shouldIgnore) {
        if (!suppressedErrors.has(message)) {
          originalConsoleWarn(
            "AdBlock Warning: An ad blocker-related unhandled promise rejection was suppressed."
          );
          suppressedErrors.add(message);
        }
        // Prevent the default browser handler
        event.preventDefault();
        return;
      }
    }
    // For all other rejections, allow the default handler
  };
})();

// **2. Proceed with React Imports and Rendering**
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
