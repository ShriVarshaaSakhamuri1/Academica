import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/users">User Management</NavLink></li>
        <li><NavLink to="/jobs">Job & Internship Board</NavLink></li>
        <li><NavLink to="/events">Event Management</NavLink></li>
        <li><NavLink to="/mentorship">Mentorship Program</NavLink></li>
        <li><NavLink to="/forums">Forum Moderation</NavLink></li>
        <li><NavLink to="/settings">Settings</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;
