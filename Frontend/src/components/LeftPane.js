import React from 'react';

const LeftPane = () => {
  const navbarStyle = {
    background: '#111',
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
      This is the LeftPane
    </div>
  );
};

export default LeftPane;
