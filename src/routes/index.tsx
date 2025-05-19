import { Route, Routes, useSearchParams } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/dashboard/HomePage";
import CreateEditBlogPage from "../pages/dashboard/CreateEditBlogPage";
import AuthorsPage from "../pages/dashboard/AuthorsPage";
import CategoryPage from "../pages/dashboard/CategoryPage";
import SignInPage from "../pages/auth/SignInPage";
import { useEffect } from "react";
import AuthRoute from "./AuthRoute";
import SignUpPage from "../pages/auth/SignUpPage";

const RoutesComponent = () => {
  const [params] = useSearchParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params.toString()]);

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs/create" element={<CreateEditBlogPage />} />

          <Route path="/blogs/edit/:id" element={<CreateEditBlogPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/categories" element={<CategoryPage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="auth/sign-in" element={<SignInPage />} />
          <Route path="auth/sign-up" element={<SignUpPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default RoutesComponent;
