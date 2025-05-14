import "./App.css";
import ThemeToggler from "./components/ui/ThemeToggler";

function App() {
  return (
    <>
      <p className="dark:text-red-300 text-black">Home page</p>
      <ThemeToggler />
    </>
  );
}

export default App;
