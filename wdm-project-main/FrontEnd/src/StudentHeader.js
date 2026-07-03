import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StudentHeader = () => {
  const [isMenuOpen, setMenuOpen] = useState(false); // State to track if the menu is open or closed

  // Toggle function to open/close the menu
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <h4 className='titleLogo'>Academica</h4>
      
      {/* Hamburger menu icon for mobile */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={isMenuOpen ? 'bar active' : 'bar'}></div>
        <div className={isMenuOpen ? 'bar active' : 'bar'}></div>
        <div className={isMenuOpen ? 'bar active' : 'bar'}></div>
      </div>

      {/* Navigation menu */}
      <nav className={isMenuOpen ? 'nav open' : 'nav'}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/student">Dashboard</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/networking">Networking</Link></li>
          <li><Link to="/opportunities">Opportunities</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default StudentHeader;
