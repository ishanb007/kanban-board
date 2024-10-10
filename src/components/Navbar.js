import React, { useState } from 'react';
import './Navbar.css';

import Display from '../assets/Display.svg';
import down from '../assets/down.svg';

const Navbar = ({ grouping, ordering, onGroupingChange, onOrderingChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="navbar">
      <div className="display-button" onClick={toggleDropdown}>
        <span className="icon"><img src={Display} alt="display Icon"/></span> {/* Unicode for hamburger menu icon */}
        <span>Display</span>
        <span className="icon"><img src={down} alt="down Icon"/></span> {/* Unicode for down arrow */}
      </div>
      {isDropdownOpen && (
        <div className="dropdown">
          <div className="dropdown-item">
            <label>Grouping</label>
            <select value={grouping} onChange={(e) => onGroupingChange(e.target.value)}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="dropdown-item">
            <label>Ordering</label>
            <select value={ordering} onChange={(e) => onOrderingChange(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;