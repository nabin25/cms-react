import "./App.css";
import ThemeToggler from "./components/ui/ThemeToggler";
import SignInPage from "./pages/auth/SignInPage";

function App() {
  return (
    <>
      <p className="dark:text-red-300 text-black">Home page</p>
      <ThemeToggler />
      <SignInPage />
    </>
  );
}

export default App;
