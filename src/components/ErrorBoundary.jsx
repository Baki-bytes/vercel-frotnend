import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div 
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#141414",
            flexDirection: "column",
            padding: "20px"
          }}
        >
          <div 
            style={{
              backgroundColor: "#2b2b2b",
              padding: "40px",
              borderRadius: "0.5rem",
              border: "1px solid #3c3c3c",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
              maxWidth: "600px",
              textAlign: "center"
            }}
          >
            <h1 style={{ color: "#7f85f5", marginBottom: "20px" }}>
              ⚠️ Something went wrong
            </h1>
            <p style={{ color: "#b0b0b0", marginBottom: "20px", fontSize: "16px" }}>
              We encountered an unexpected error. Please try again.
            </p>
            {import.meta.env.MODE === "development" && this.state.error && (
              <div 
                style={{
                  backgroundColor: "#1a1a1a",
                  padding: "15px",
                  borderRadius: "4px",
                  marginBottom: "20px",
                  textAlign: "left",
                  fontSize: "12px",
                  color: "#b0b0b0",
                  maxHeight: "200px",
                  overflowY: "auto",
                  fontFamily: "monospace",
                  border: "1px solid #3c3c3c"
                }}
              >
                <strong style={{ color: "#7f85f5" }}>Error Details:</strong>
                <p>{this.state.error.toString()}</p>
                {this.state.errorInfo && (
                  <details style={{ marginTop: "10px" }}>
                    <summary>Stack Trace</summary>
                    <pre style={{ marginTop: "10px" }}>
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}
            <button
              onClick={this.handleReset}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#4f52b2",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                marginRight: "10px",
                transition: "all 0.3s ease",
                fontWeight: "600"
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#7f85f5";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 10px 20px rgba(127, 133, 245, 0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#4f52b2";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.href = "/"}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "transparent",
                color: "#7f85f5",
                border: "2px solid #7f85f5",
                borderRadius: "0.5rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontWeight: "600"
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "rgba(127, 133, 245, 0.1)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 10px 20px rgba(127, 133, 245, 0.2)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Go to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
