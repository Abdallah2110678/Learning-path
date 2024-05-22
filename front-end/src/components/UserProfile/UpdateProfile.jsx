import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { REST_API_BASE_URL } from "./../../App";
import { Store } from "./../../store";
import Back from "../common/back/Back";

const UpdateProfile = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({ ...userInfo });

  useEffect(() => {
    setFormData({ ...userInfo });
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateProfile = () => {
    axios
      .put(`${REST_API_BASE_URL}/user/updateProfile/${userInfo.id}`, formData)
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
        setSuccessMessage("Profile updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateProfile();
  };

  return (
    <div className="edit-profile-form">
      <Back title="User Profile" />
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Profile</button>
        {successMessage && <div>{successMessage}</div>}
      </form>
    </div>
  );
};

export default UpdateProfile;
