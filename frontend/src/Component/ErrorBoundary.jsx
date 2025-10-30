import React from "react";
import Icon from "./AppIcon";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the fallback UI shows
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });

    // Optional: send errors to an error tracking service (Sentry, LogRocket, etc.)
    // logService.capture(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="text-center p-8 max-w-md">
            {/* Emoji/SVG Illustration */}
            <div className="flex justify-center items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 32 33" fill="none">
                <path
                  d="M16 28.5C22.6 28.5 28 23.1 28 16.5C28 9.8 22.6 4.5 16 4.5C9.3 4.5 4 9.8 4 16.5C4 23.1 9.3 28.5 16 28.5Z"
                  stroke="#343330"
                  strokeWidth="2"
                />
                <path d="M11.5 15.5C12.3 15.5 13 14.8 13 14C13 13.1 12.3 12.5 11.5 12.5C10.7 12.5 10 13.1 10 14C10 14.8 10.7 15.5 11.5 15.5Z" fill="#343330" />
                <path d="M20.5 15.5C21.3 15.5 22 14.8 22 14C22 13.1 21.3 12.5 20.5 12.5C19.7 12.5 19 13.1 19 14C19 14.8 19.7 15.5 20.5 15.5Z" fill="#343330" />
                <path
                  d="M21 22.5C19.9 20.7 18.2 19.5 16 19.5C13.7 19.5 12 20.7 11 22.5"
                  stroke="#343330"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-medium text-neutral-800 mb-2">
              Something went wrong
            </h1>

            {/* Message */}
            <p className="text-neutral-600 text-base mb-6">
              We encountered an unexpected error while processing your request.
            </p>

            {/* Action buttons */}
            <div className="flex justify-center items-center gap-4">
              {/* Reset Button */}
              <button
                onClick={this.handleReset}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded transition duration-200"
              >
                Try Again
              </button>

              {/* Go Back Home */}
              <button
                onClick={() => (window.location.href = "/")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded flex items-center gap-2 transition-colors duration-200 shadow-sm"
              >
                <Icon name="ArrowLeft" size={18} color="#fff" />
                Back Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    // If no error, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
