import { Navigate, Route, Routes } from "react-router-dom";
import { Store } from "./store";
import { useContext } from "react";

function ProtectedRoute({ element, allowedRoles }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  if (!userInfo) {
    return <Navigate to="/login" />;
  }
  if (!allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/" />;
  }
  return element;
}

export default ProtectedRoute;