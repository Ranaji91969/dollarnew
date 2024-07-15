import React from 'react';
import '../sidebar/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><a href="#dashboard">Dashboard</a></li>
          {/* Add a logout button */}
        <li><button className="logout-button">Logout</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;
