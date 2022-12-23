import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

interface Props {
  children: React.ReactNode;
}
const ProtectedRoute = ({ children }: Props) => {
  const { isUserLoggedIn } = useContext(UserContext);

  if (!isUserLoggedIn) {
    const isConfirmed = window.confirm(
      "You don't have an account, please sign up"
    );
    if (isConfirmed) {
    return <Navigate to="/signup" />;}
    else if(!isConfirmed){
      return <Navigate to="/" />;}

    }

  return <div>{children}</div>;
};

export default ProtectedRoute;
