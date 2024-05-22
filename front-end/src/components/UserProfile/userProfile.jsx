import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import Back from '../common/back/Back';
import { Store } from './../../store';
import Sidebar from '../common/asidebar-profile/asidebar'; // Importing the Sidebar component
import "./userProfile.css";

const UserProfile = () => {
    const { state } = useContext(Store); // Accessing state from StoreProvider
    const { userInfo } = state; // Destructuring userInfo from state

    return (
        <div className="main-content">
            <Back title="User Profile" />
            <div className="user-profile-page">
                <Sidebar /> {/* Adding the Sidebar component */}
                <div className="user-profile-container">
                    <div className="Header">
                        <div className="Text">User Profile</div>
                        <div className="underline"></div>
                    </div>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                            <tr>
                                <td>First Name:</td>
                                <td>{userInfo && userInfo.fname}</td>
                            </tr>
                            <tr>
                                <td>Last Name:</td>
                                <td>{userInfo && userInfo.lname}</td>
                            </tr>
                            <tr>
                                <td>Data of birth:</td>
                                <td>{userInfo && userInfo.dob}</td>
                            </tr>
                            <tr>
                                <td>Gender:</td>
                                <td>{userInfo && userInfo.gender}</td>
                            </tr>
                            <tr>
                                <td>Phone:</td>
                                <td>{userInfo && userInfo.phone}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{userInfo && userInfo.email}</td>
                            </tr>
                        </tbody>
                    </table>
                    {/* Password field not displayed for security reasons */}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
