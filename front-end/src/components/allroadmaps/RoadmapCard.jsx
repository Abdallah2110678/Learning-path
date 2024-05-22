import React, { useContext, useState } from "react";
import "./roadmaps.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { REST_API_BASE_URL } from "./../../App";
import axios from "axios";
import { Store } from "../../store";
import { Link, useNavigate } from "react-router-dom";

const RoadmapsCard = ({ courses }) => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [isEnrolled, setIsEnrolled] = useState(false);

  const addCourseToCart = async (courseId) => {
    if (!userInfo) {
      alert("Please login to add course to cart");
      navigate("/login");
    } else if (userInfo.role != "STUDENT") {
      alert("Student only can Add to cart");
      return;
    } else {
      try {
        const response = await axios.post(
          `${REST_API_BASE_URL}/student/cart/addcourse/${userInfo.id}/${courseId}`
        );
        alert(response.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data);
        } else {
          console.error("An error occurred:", error.message);
        }
      }
    }
  };

  const checkEnrollmentStatus = async (courseId) => {
    try {
      const response = await axios.get(
        `${REST_API_BASE_URL}/student/enrollment/${userInfo.id}/${courseId}/check`
      );
      if (response.data) {
        alert("Already enrolled to this course.");
      } else {
        navigate(`/enroll/${courseId}`);
      }
    } catch (error) {
      console.error("Error checking enrollment:", error);
    }
  };

  return (
    <>
      <section className="coursesCard">
        <div className="container grid2">
          {courses.map((course) => (
            <div className="items">
              <div className="content flex">
                <div className="left">
                  <div className="img">
                    {/* picture of course */}
                    <img src={""} alt="" />
                  </div>
                </div>
                <div className="text">
                  <h1>{course.title}</h1>
                  <div className="rate">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <label htmlFor="">(5.0)</label>
                  </div>
                  <div className="details">
                    <>
                      {" "}
                      {course.user ? (
                        <div className="box">
                          <div className="dimg">
                            {/* display user image here */}
                            <img src={""} alt="" />
                          </div>
                          <div className="para">
                            <h4>By {course.user.fname}</h4>
                          </div>
                        </div>
                      ) : (
                        <div className="box">
                          <div className="dimg">
                            {/* display user image here */}
                            <img src={""} alt="" />
                          </div>
                          <div className="para">
                            <h4>By Admin</h4>
                          </div>
                        </div>
                      )}
                      {course.courseMaterials.length ? (
                        <span>({course.courseMaterials.length}) Video</span>
                      ) : (
                        <span>
                          ({course.courseMaterials.length}) Videos Not Found
                        </span>
                      )}
                    </>
                  </div>
                </div>
              </div>
              <div className="price">
                {course.price ? (
                  <h3>$ {course.price} All Course</h3>
                ) : (
                  <h3>Free Course</h3>
                )}
              </div>
              <button
                className="outline-btn"
                style={{ marginBottom: "5px" }}
                onClick={() => addCourseToCart(course.id)}
              >
                Add To Cart <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              </button>

              <button
                className="outline-btn"
                onClick={() => checkEnrollmentStatus(course.id)}
              >
                ENROLL NOW !
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default RoadmapsCard;
