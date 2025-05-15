import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import QueryProvider from "./providers/QueryProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import AuthProvider from "./providers/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import SignInPage from "./pages/auth/SignInPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <QueryProvider>
          <ThemeProvider>
            <AuthProvider>
              <Routes>
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<p>Hello</p>} />
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
