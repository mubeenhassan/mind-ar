import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ t }) => {

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          EIC AR
        </Link>
      </div>
    </header>
  );
};

export default Header;
