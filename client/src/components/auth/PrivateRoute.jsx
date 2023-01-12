import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { loggedUser } = useSelector((store) => store.user);

  return loggedUser.accessToken ? children : <Navigate to="/login" />;
};
