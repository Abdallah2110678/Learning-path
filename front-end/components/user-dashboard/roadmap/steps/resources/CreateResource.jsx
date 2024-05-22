import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { REST_API_BASE_URL } from "../../../../../App";
import axios from "axios";

const UserCreateResources = () => {
 
  const {id} = useParams();
  const [courseData, setCourseData] = useState({
    title: "",
    url: "",
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
      case "url":
        return !value.trim() ? "url is required." : "";
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
        `${REST_API_BASE_URL}/admin/step/${id}/resource`,
        courseData
      );
      console.log("Course created:", response.data);
      setSuccessMessage(` Added Resource successfully to ${roadmap.title}.`);
      setCourseData({
        title: "",
        url: "",
      });
    } catch (error) {
      console.error("Error creating course:", error);
      // Handle specific errors or display a generic error message
    }
  };

  const [roadmap, setRoadmap] = useState([]);
  const handleFetchRoadmap = async () => {
    try {
      const response = await axios.get(`${REST_API_BASE_URL}/admin/step/${id}`);
      const roadmapData = response.data;
      setRoadmap(roadmapData);
      setRoadmap(roadmapData);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };
  console.log(roadmap)

  useEffect(() => {
    handleFetchRoadmap();
  }, []);

  return (
    <div className="main">
      <div className="detailss">
        <div className="recentOrderss">
          <div className="cardHeader">
            <h2>Create New Resouce for {roadmap.title}</h2>
            <Link to={`/user/roadmap/steps/resources/${id}`} className="btn">
              All Resources
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
              <label htmlFor="url" className="form-label">
                url:
              </label>
              <textarea
                className="form-control"
                id="url"
                name="url"
                value={courseData.url}
                onChange={handleChange}
              />
              {errors.url && (
                <div className="error text-danger">{errors.url}</div>
              )}
            </div>
            <button type="submit" className="btn "style={{background:"#1eb2a6",color:"white"}}>
              Create New Resource
            </button>
            {successMessage && (
              <div className="alert alert-success mt-3">{successMessage}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserCreateResources;
