import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { REST_API_BASE_URL } from "../../../App";
import { Store } from "../../../store";

const UserCreateRoadmap = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    // Assuming categoryId is the ID of the category for the course
  });

  // Define predefined categories directly in the frontend

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "title":
        return !value.trim() ? "Title is required." : "";
      case "description":
        return !value.trim() ? "Description is required." : "";
      default:
        return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};
    for (const key in courseData) {
      if (courseData.hasOwnProperty(key)) {
        formErrors[key] = validateField(key, courseData[key]);
      }
    }
    if (Object.values(formErrors).some((error) => error)) {
      setErrors(formErrors);
      return;
    }
    try {
      const response = await axios.post(
        `${REST_API_BASE_URL}/admin/create/roadmap/${userInfo.id}`,
        courseData
      );
      console.log("Course created:", response.data);
      setSuccessMessage("Roadmap Created Successfully.");
      setCourseData({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("Error creating course:", error);
      // Handle specific errors or display a generic error message
    }
  };

  return (
    <div className="main">
      <div className="detailss">
        <div className="recentOrderss">
          <div className="cardHeader">
            <h2>Create New Roadmap</h2>
            <Link to={`/user/roadmaps`} className="btn">
              All Roadmaps
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title:
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={courseData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <div className="error text-danger">{errors.title}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={courseData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <div className="error text-danger">{errors.description}</div>
              )}
            </div><div>

            <button type="submit" className="btn "style={{background:"#1eb2a6",color:"white"}} >
              create new roadmap
            </button></div>
            {successMessage && (
              <div className="alert alert-success mt-3">{successMessage}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserCreateRoadmap;
