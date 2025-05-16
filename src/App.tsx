import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import QueryProvider from "./providers/QueryProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import AuthProvider from "./providers/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import SignInPage from "./pages/auth/SignInPage";
import HomePage from "./pages/dashboard/HomePage";
import AuthorsPage from "./pages/dashboard/AuthorsPage";
import CategoryPage from "./pages/dashboard/CategoryPage";
import CreateEditBlogPage from "./pages/dashboard/CreateEditBlogPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <QueryProvider>
          <ThemeProvider>
            <AuthProvider>
              <Routes>
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/blogs/create"
                    element={<CreateEditBlogPage />}
                  />
                  <Route path="/authors" element={<AuthorsPage />} />
                  <Route path="/categories" element={<CategoryPage />} />
                </Route>
                <Route path="auth/sign-in" element={<SignInPage />}></Route>
              </Routes>
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
