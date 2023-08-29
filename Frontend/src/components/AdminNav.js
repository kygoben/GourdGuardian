import React from 'react';

const Navbar = () => {
  const navbarStyle = {
    background: '#333',
    color: '#fff',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#fff',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#fff',
    marginLeft: '10px',
  };

  return (
    <div style={navbarStyle}>
      <div style={logoStyle}>MyLogo</div>
      <div>
        <a style={linkStyle} href="#">Home</a>
        <a style={linkStyle} href="#">About</a>
        <a style={linkStyle} href="#">Services</a>
        <a style={linkStyle} href="#">Contact</a>
      </div>
    </div>
  );
};

export default Navbar;
