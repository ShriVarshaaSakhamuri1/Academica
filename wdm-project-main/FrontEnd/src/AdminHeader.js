import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
    const [isMenuOpen, setMenuOpen] = useState(false); // State to track if the menu is open or closed

    // Toggle function to open/close the menu
    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };
  
  return (
    <header className="header">
      <img src={"new.webp"} alt="Logo" className="logo" />
      
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
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/createevent">Create Event</Link></li>
          <li><Link to="/postjob">Create Opportunities</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/logout">Logout</Link></li>
         
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;
