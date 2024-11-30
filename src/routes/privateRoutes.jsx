import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AthContext";

const PrivateRoutes = () => {
  const { state } = useContext(AuthContext);
  const { isLoggedIn } = state;

  // Redirect to the home page if not logged in
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
