import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-item">
                <Link to="/">Home</Link>
            </div>
            <div className="sidebar-item">
                <Link to="/UpdateProfile">Update Profile</Link>
            </div>
            <div className="sidebar-item">
                <Link to="/delete-profile">Delete Profile</Link>
            </div>
            <div className="sidebar-item">
                <Link to="/logout">Log Out</Link>
            </div>
        </div>
    );
};

export default Sidebar;
