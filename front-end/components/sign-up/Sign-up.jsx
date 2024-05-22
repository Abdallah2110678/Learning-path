import React, { useEffect, useState } from "react";
import Back from "../common/back/Back";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { REST_API_BASE_URL } from "./../../App";

const SignUp = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [Data, setData] = useState({
    fname: "",
    lname: "",
    password: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    role: "USER",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const emptyData = () => {
    setData({
      fname: "",
      lname: "",
      password: "",
      gender: "",
      dob: "",
      email: "",
      phone: "",
      role: "",
    });
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
    let error = "";

    switch (name) {
      case "fname":
      case "lname":
        if (!value.trim() || value.length < 3 || !/^[a-zA-Z]+$/.test(value)) {
          error =
            "Name must be non-empty, contain only characters, and be at least 3 characters long.";
        }
        break;
      case "password":
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}/.test(value)) {
          error =
            "Password must contain at least one digit, one lowercase and one uppercase character, and be at least 3 characters long.";
        }
        break;
      case "phone":
        if (!/^\d{11}$/.test(value)) {
          error = "Phone number must be a valid 11-digit number.";
        }
        break;
      case "gender":
        if (!value) {
          error = "Gender is required.";
        }
        break;
      case "dob":
        const currentDate = new Date();
        const selectedDate = new Date(value);
        const age = currentDate.getFullYear() - selectedDate.getFullYear();
        if (age < 15) {
          error = "You must be at least 15 years old.";
        }
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Invalid email address.";
          break;
        }
        try {
          const response = await axios.get(
            `${REST_API_BASE_URL}/user/check-email/${value}`
          );
          if (response.data) {
            error = "Email is already in use.";
          }
        } catch (error) {
          console.error("Error checking email:", error);
          // Handle error (e.g., show an error message)
        }
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
    setData({ ...Data, [name]: value });
  };

  const validateEmptyFields = () => {
    let isEmpty = false;
    const newErrors = {};
    for (const key in Data) {
      if (Data.hasOwnProperty(key)) {
        if (!Data[key].trim()) {
          newErrors[key] = "Field must not be empty.";
          isEmpty = true;
        } else {
          newErrors[key] = "";
        }
      }
    }
    setErrors({ ...errors, ...newErrors });
    return isEmpty;
  };

  const handleStudentCreation = () => {
    axios
      .post(`${REST_API_BASE_URL}/user/register`, Data)
      .then((response) => {
        console.log(Data.role, " created: ", response.data);
        emptyData();
        NavigatePage();
      })
      .catch((error) => {
        console.error("Error creating student:", error);
      });
  };

  const NavigatePage = () => {
    const currentPath = location.pathname;
    if (currentPath === "/sign-up") {
      navigate("/login");
    } else {
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors && !validateEmptyFields()) {
      handleStudentCreation();
    }
  };

  return (
    <>
      <Back title="Sign Up" />
      <div className="Container">
        <div className="Header">
          <div className="Text">Sign Up</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="fname"
              value={Data.fname}
              onChange={handleChange}
            />
            {errors.fname && (
              <div className="error text-danger">{errors.fname}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lname"
              value={Data.lname}
              onChange={handleChange}
            />
            {errors.lname && (
              <div className="error text-danger">{errors.lname}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={Data.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="error text-danger">{errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={Data.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="error text-danger">{errors.password}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender:
            </label>
            <select
              className="form-select"
              id="gender"
              name="gender"
              value={Data.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <div className="error text-danger">{errors.gender}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="dob" className="form-label">
              Date of Birth:
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              value={Data.dob}
              onChange={handleChange}
            />
            {errors.dob && (
              <div className="error text-danger">{errors.dob}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone:
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={Data.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <div className="error text-danger">{errors.phone}</div>
            )}
          </div>
          {/* New field for role */}
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          {successMessage && (
            <div className="alert alert-success mt-3">{successMessage}</div>
          )}
        </form>
      </div>
    </>
  );
};

export default SignUp;
