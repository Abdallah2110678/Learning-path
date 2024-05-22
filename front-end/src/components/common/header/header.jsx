import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Head from "./Head";
import "./header.css";
import axios from "axios";
import { REST_API_BASE_URL } from "./../../../App";
import CartItems from "./CartItems";
import { Store } from "../../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const renderNavigationItems = () => {
    if (userInfo) {
      switch (userInfo.role) {
        case "ADMIN":
          return (
            <li>
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
          );
          case "USER":
          return (
            <li>
              <Link to="/user/profile">Profile</Link>
            </li>
          );
        default:
          return null;
      }
    }
    return null; // Return null if userInfo is not available
  };

  return (
    <>
      <Head />
      <header>
        <nav className="flexSB">
          <ul
            className={click ? "mobile-nav" : "flexSB"}
            onClick={() => setClick(false)}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            {renderNavigationItems()}
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>

            <li>
              <Link to="/userProfile">User Profile</Link>
            </li>

            {userInfo ? (
              <li>
                <button onClick={() => signoutHandler()}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
          <div className="start">
            <div className="button">GET CERTIFICATE</div>
          </div>
          <button className="togglee" onClick={() => setClick(!click)}>
            {click ? (
              <i className="fa fa-times"> </i>
            ) : (
              <i className="fa fa-bars"></i>
            )}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
