import React from 'react';
import '../navbar/Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        Dollar ERP
      </div>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#Profile">Profile</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
