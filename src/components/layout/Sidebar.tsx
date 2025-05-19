import { FilePlus, Layers, Menu, Newspaper, User } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import routes from "../../routes/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const myRoutes = [
    { label: "Blogs", route: routes.blogs.home, icon: <Newspaper /> },
    { label: "Create Blog", route: routes.blogs.create, icon: <FilePlus /> },
    { label: "Authors", route: routes.authors, icon: <User /> },
    { label: "Categories", route: routes.categories, icon: <Layers /> },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Button variant="outline">
            <Menu className="text-black dark:text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent className="p-3" side="left">
          <SheetTitle>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#94288d] to-[#ff4504] font-bold">
              SpellCMS
            </span>{" "}
            Dashboard
          </SheetTitle>
          <SheetDescription>
            <div className="flex flex-col gap-4">
              {myRoutes.map((singleRoute) => (
                <div
                  onClick={() => navigate(singleRoute?.route)}
                  key={singleRoute.route}
                  className={cn(
                    "flex w-full h-14 transition-all duration-200 hover:bg-gray-500/15 px-5 items-center rounded-md justify-between bg-gray-500/10 cursor-pointer"
                  )}
                >
                  <p>{singleRoute.label}</p>
                  {singleRoute.icon}
                </div>
              ))}
            </div>
          </SheetDescription>
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
