import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import ThemeToggler from "../theme/ThemeToggler";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <nav className="bg-white/30 dark:bg-black/10 backdrop-blur-sm text-white p-4 fixed w-full top-0 left-0 z-10 px-4 md:px-10">
        <div className="w-full flex justify-between items-centers">
          <div className="flex items-center justify-start gap-2">
            <Sidebar />
            <div
              className="text-xl font-bold text-black dark:text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              SpellCMS
            </div>
          </div>

          <div className="flex items-center justify-between gap-6">
            <ThemeToggler />
            <Popover>
              <PopoverTrigger asChild>
                <img
                  src={user?.avatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </PopoverTrigger>
              <PopoverContent className="">
                <ul>
                  <li>{user?.full_name}</li>
                  <li>{user?.email}</li>
                  <Button onClick={() => logout()} color="danger">
                    Log out
                  </Button>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
