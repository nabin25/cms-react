import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import Navbar from "../components/layout/Navbar";
import { ConfirmationModal } from "../components/modals/ConfirmationModal";
import { GlobalModal } from "../components/modals/GlobalModal";
import routes from "./routes";

const ProtectedRoute = () => {
  const { token, user } = useAuth();

  return token && user ? (
    <>
      <Navbar />
      <div className="flex">
        <div className="pt-20 px-4 md:px-10 pb-5 grow">
          <Outlet />
          <ConfirmationModal />
          <GlobalModal />
        </div>
      </div>
    </>
  ) : (
    <Navigate to={routes.auth.signIn} />
  );
};
export default ProtectedRoute;
