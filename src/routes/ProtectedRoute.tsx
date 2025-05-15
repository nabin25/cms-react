import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import Navbar from "../components/layout/Navbar";

const ProtectedRoute = () => {
  const { token, user } = useAuth();
  return token && user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/auth/sign-in" />
  );
};
export default ProtectedRoute;
