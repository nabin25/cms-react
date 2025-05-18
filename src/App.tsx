import { BrowserRouter } from "react-router-dom";
import "./App.css";
import QueryProvider from "./providers/QueryProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import RoutesComponent from "./routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <QueryProvider>
          <ThemeProvider>
            <AuthProvider>
              <Toaster />
              <RoutesComponent />
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
