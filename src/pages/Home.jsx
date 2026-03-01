import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../context/ChatProvider";
import "./Home.css";

const FEATURES = [
  {
    icon: "💬",
    title: "Instant Messaging",
    description: "Real-time messaging with your team members with instant notifications",
  },
  {
    icon: "📞",
    title: "Video Meetings",
    description: "Seamless video conferencing and screen sharing capabilities",
  },
  {
    icon: "📅",
    title: "Smart Scheduling",
    description: "Schedule and manage meetings with an integrated calendar system",
  },
  {
    icon: "👥",
    title: "Team Collaboration",
    description: "Connect with colleagues and work together in real-time",
  },
];

function Home() {
  const navigate = useNavigate();
  const { user } = ChatState();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  // Throttle scroll events for better performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollPosition(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">🔵</span>
            <span className="logo-text">MsTeams</span>
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#about" className="nav-link">About</a>
            {user ? (
              <>
                <a href="#contact" className="nav-link">Contact</a>
                <button
                  className="btn btn-primary"
                  onClick={() => handleNavClick("/chats")}
                >
                  Go to App
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleNavClick("/login")}
                >
                  Sign In
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleNavClick("/signUp")}
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="hero" 
        style={{ 
          transform: `translateY(${scrollPosition * 0.5}px) translateZ(0)` 
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">
            Connect, Collaborate,
            <span className="gradient-text"> Communicate</span>
          </h1>
          <p className="hero-subtitle">
            Experience seamless team collaboration with instant messaging, video meetings, and smart scheduling all in one platform.
          </p>
          <div className="hero-buttons">
            {user ? (
              <button className="btn btn-large btn-primary" onClick={() => handleNavClick("/chats")}>
                Open Dashboard
              </button>
            ) : (
              <>
                <button className="btn btn-large btn-primary" onClick={() => handleNavClick("/signUp")}>
                  Start Free Trial
                </button>
                <button className="btn btn-large btn-secondary" onClick={() => handleNavClick("/login")}>
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">
            <div className="card-header">💬 New Message</div>
            <p className="card-text">Hey! How's the project going?</p>
          </div>
          <div className="floating-card card-2">
            <div className="card-header">📞 Meeting</div>
            <p className="card-text">Team Standup - 2:00 PM</p>
          </div>
          <div className="floating-card card-3">
            <div className="card-header">👥 Team</div>
            <p className="card-text">12 members online</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need for seamless team communication</p>
        </div>
        <div className="features-grid">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${activeFeature === index ? "active" : ""}`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-footer">
                <span className="arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-container">
          <div className="stat-item">
            <h3>10K+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat-item">
            <h3>50M+</h3>
            <p>Messages Daily</p>
          </div>
          <div className="stat-item">
            <h3>99.9%</h3>
            <p>Uptime</p>
          </div>
          <div className="stat-item">
            <h3>24/7</h3>
            <p>Support</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="about" className="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Get started in just a few simple steps</p>
        </div>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sign Up</h3>
            <p>Create your account in seconds with just an email</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Invite Team</h3>
            <p>Add your team members and start collaborating</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Start Working</h3>
            <p>Chat, meet, and schedule with your entire team</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="cta">
        <div className="cta-content">
          <h2>Ready to Transform Your Team Communication?</h2>
          <p>Join thousands of teams already using TeamHub to collaborate more effectively</p>
          {!user && (
            <div className="cta-buttons">
              <button className="btn btn-large btn-primary" onClick={() => navigate("/signUp")}>
                Get Started Now
              </button>
              <button className="btn btn-large btn-secondary" onClick={() => navigate("/login")}>
                Sign In
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>TeamHub</h4>
            <p>Modern team communication platform</p>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <ul>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 MsTeams. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
