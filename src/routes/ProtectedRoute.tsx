import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import Navbar from "../components/layout/Navbar";
import { ConfirmationModal } from "../components/modals/ConfirmationModal";

const ProtectedRoute = () => {
  const { token, user } = useAuth();
  return token && user ? (
    <>
      <Navbar />
      <div className="pt-18 px-4 md:px-10">
        <Outlet />
        <ConfirmationModal />
      </div>
    </>
  ) : (
    <Navigate to="/auth/sign-in" />
  );
};
export default ProtectedRoute;
