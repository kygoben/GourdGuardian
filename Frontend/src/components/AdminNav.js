import React from "react";
import ProgressBar from "./ProgressBar";

const Navbar = () => {
  const navbarStyle = {
    background: "#181818",  // Dark background color
    color: "#b0b0b0",  // Lighter text color for better contrast against the dark background
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #333",  // Adding a subtle border at the bottom
  };

  const logoStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#007bff",  // Blue color for the logo
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#b0b0b0",  // Lighter text color for better contrast against the dark background
    marginLeft: "10px",
    padding: "5px",  // Adding padding for a better clickable area
    borderRadius: "5px",  // Adding border-radius for hover effect
    transition: "background 0.3s",  // Adding transition for smooth background change on hover
  };

  return (
    <div style={navbarStyle}>
      <div style={logoStyle}>MyLogo</div>
      <ProgressBar />
      <div>
        <a style={linkStyle} href="/admin/home" onMouseEnter={(e) => e.target.style.background = '#333'} onMouseLeave={(e) => e.target.style.background = 'transparent'}>
          Home
        </a>
        <a style={linkStyle} href="/admin/volunteerControls" onMouseEnter={(e) => e.target.style.background = '#333'} onMouseLeave={(e) => e.target.style.background = 'transparent'}>
          VolunteerLocks
        </a>
        <a style={linkStyle} href="/admin/status" onMouseEnter={(e) => e.target.style.background = '#333'} onMouseLeave={(e) => e.target.style.background = 'transparent'}>
          Status
        </a>
      </div>
    </div>
  );
};

export default Navbar;
