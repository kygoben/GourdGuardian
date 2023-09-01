import React from "react";
import ProgressBar from "./ProgressBar";

const Navbar = () => {
  const navbarStyle = {
    background: "#333",
    color: "#fff",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const logoStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#fff",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#fff",
    marginLeft: "10px",
  };

  return (
    <div style={navbarStyle}>
      <div style={logoStyle}>MyLogo</div>
      <ProgressBar />
      <div>
        <a style={linkStyle} href="/admin/home">
          Home
        </a>
        <a style={linkStyle} href="/admin/volunteerControls">
          VolunteerLocks
        </a>
        <a style={linkStyle} href="/admin/status">
          Status
        </a>
      </div>
    </div>
  );
};

export default Navbar;
