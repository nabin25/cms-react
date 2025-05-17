import { useNavigate, useSearchParams } from "react-router-dom";
import useFetchBlogs from "../../api/blogs/useFetchBlogs";
import PaginationComponent from "../../components/pagination/PaginationComponent";
import BlogCard from "../../features/blogs/BlogCard";
import { Button } from "../../components/ui/button";
import routes from "../../routes/routes";
import { Skeleton } from "../../components/ui/skeleton";
import BlogFilter from "../../features/blogs/BlogFilter";
import { Plus } from "lucide-react";
import NoDataFound from "../../components/NoDataFound";
import { useEffect } from "react";

const HomePage = () => {
  const { data, isLoading, isError } = useFetchBlogs();
  const [params] = useSearchParams();
  const limit = params.get("limit") ?? "10";
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "SpellCMS Home";
  }, []);
  return (
    <div>
      <div className="flex sticky top-15 justify-between py-5 bg-white/30 dark:bg-black/10 backdrop-blur-md z-10">
        <PaginationComponent
          disableNext={!data || data?.length !== parseInt(limit)}
        />
        <div className="flex gap-2 shrink">
          <Button onClick={() => navigate(routes.blogs.create)}>
            <Plus />
          </Button>
          <BlogFilter />
        </div>
      </div>
      {!isLoading && (isError || !data || data.length === 0) && <NoDataFound />}
      <div className="flex flex-wrap py-5 gap-5 justify-center items-center">
        {isLoading &&
          Array.from({ length: 20 }).map((_, i) => (
            <div
              className="w-[350px] border rounded-lg p-4 space-y-4 shadow-sm"
              key={i}
            >
              <div>
                <Skeleton className="h-6 w-full mb-2" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/5" />
                  <div className="flex justify-end items-center gap-2 flex-grow">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              </div>

              <div className="h-[160px] w-full overflow-hidden flex items-center justify-center rounded-md">
                <Skeleton className="h-full w-full rounded-md" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-4 w-10 rounded-md" />
                <Skeleton className="h-4 w-10 rounded-md" />
                <Skeleton className="h-4 w-10 rounded-md" />
              </div>

              <div className=" flex justify-between">
                <Skeleton className="w-1/3 h-5 rounded-md" />
                <Skeleton className="w-1/5 h-5 rounded-md" />
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
              </div>
            </div>
          ))}
        {data &&
          data?.map((blog) => <BlogCard key={blog.id} blogData={blog} />)}
      </div>
    </div>
  );
};

export default HomePage;
