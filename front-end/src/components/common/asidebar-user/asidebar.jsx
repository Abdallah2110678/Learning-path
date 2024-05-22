import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../../../store";

const Aside_user = () => {
  const [active, setActive] = useState(false);
  const toggleMenu = () => {
    setActive(!active);
  };
  const handleMouseOver = (e) => {
    const listItems = document.querySelectorAll(".navigation li");
    listItems.forEach((item) => {
      item.classList.remove("hovered");
    });
    e.target.classList.add("hovered");
  };

  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div>
      {/* Navigation */}
      <div className={`navigation ${active ? "active" : ""}`}>
        <ul>
          <li onClick={handleMouseOver}>
            <Link to="/">
              <span className="iconn">
                <ion-icon name="logo-apple"></ion-icon>
              </span>
              <span className="title">e-learning</span>
            </Link>
          </li>
          <li onClick={handleMouseOver}>
            <Link to="/">
              <span className="iconn"></span>
              <span className="title">Home</span>
            </Link>
          </li>
          
          <li onClick={handleMouseOver}>
            <Link to="/user/profile">
              <span className="iconn">
                <ion-icon name="document-text-outline"></ion-icon>
              </span>
              <span className="title">Profile</span>
            </Link>
          </li>
          
          
          <li onClick={handleMouseOver}>
            <Link to="/user/createroadmap">
              <span className="iconn">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span className="title">Add Roadmap</span>
            </Link>
          </li>
          <li onClick={handleMouseOver}>
            <Link to={`/user/roadmaps`}>
              <span className="iconn">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Roadmaps</span>
            </Link>
          </li>
          
          <li onClick={handleMouseOver} >
          <Link to="/login" onClick={() => signoutHandler()}>
              <span className="iconn">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span className="title">Log Out</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Aside_user;
