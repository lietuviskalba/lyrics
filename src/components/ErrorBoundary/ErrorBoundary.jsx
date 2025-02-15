// src/components/ErrorBoundary/ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.ignoreErrors = [
      /browser is not defined/,
      /ERR_BLOCKED_BY_CLIENT/,
      /adblock-yt-cs\.js/,
      /generate_204/,
      /youtubei\/v1\/log_event/,
      /play\.google\.com\/log/,
      // Add more patterns as needed
    ];
  }

  static getDerivedStateFromError(error) {
    // Update state to display fallback UI
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service if needed
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    const shouldIgnore = ignoreErrors.some((pattern) =>
      pattern.test(error.message)
    );

    if (!shouldIgnore) {
      // Log the error or send it to an external service
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    } else {
      // Optionally, you can log that an ignored error occurred
      console.warn("Ignored error:", error.message);
    }
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
