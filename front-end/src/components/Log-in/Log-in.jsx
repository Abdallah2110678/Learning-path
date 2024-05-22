import axios from "axios";
import React, { useContext, useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import Back from "../common/back/Back";
import { REST_API_BASE_URL } from "./../../App";
import "./Log-in.css";

import { useEffect } from "react";
import { Store } from "../../store";
function LOGIN() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${REST_API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        const { user, token } = data;
        ctxDispatch({ type: "USER_SIGNIN", payload: { ...user, token } });
        localStorage.setItem("userInfo", JSON.stringify({ ...user, token }));
        console.log(user,token)
        navigate("/");
        
      } else {
        const errorMessage = await response.text();
        throw new Error(`Login failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
    }
  };
  return (
    <>
      <Back title="LOG IN" />
      <div className="Container">
        <div className="Header">
          <div className="Text">LOG IN</div>
          <div className="underline"></div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="forgot-password">
              Forgot password? <span>Click Here!</span>
            </div>

            <div className="create-account-link">
              Don't have an account? <Link to="/sign-up">Create One Here</Link>
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          {error && <div className="alert alert-danger">{error}</div>} {}
        </div>
      </div>
    </>
  );
}

export default LOGIN;
