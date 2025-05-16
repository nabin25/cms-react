import { useSearchParams } from "react-router-dom";
import useFetchPaginatedAuthors from "../../api/authors/useFetchPaginatedAuthors";
import PaginationComponent from "../../components/pagination/PaginationComponent";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";
import AuthorCard from "../../features/authors/AuthorCard";
import CreateEditAuthor from "../../features/authors/CreateEditAuthor";
import { useModalStore } from "../../stores/useModalStore";

const AuthorsPage = () => {
  const { data, isLoading } = useFetchPaginatedAuthors();
  const [params] = useSearchParams();
  const { open } = useModalStore();
  const limit = params.get("limit") ?? "10";
  return (
    <div>
      <div className="flex py-5 sticky top-15 justify-between bg-white/30 dark:bg-black/10 backdrop-blur-md z-10">
        <PaginationComponent
          disableNext={data && data.length !== parseInt(limit)}
        />
        <Button
          onClick={() =>
            open({ view: <CreateEditAuthor />, title: "Create New Author" })
          }
        >
          Create Author
        </Button>
      </div>

      <div className="flex flex-wrap py-5 gap-5 justify-center items-center">
        {isLoading &&
          Array.from({ length: 20 }).map((_, i) => (
            <div
              className="w-[350px] border rounded-lg p-4 shadow-sm space-y-4"
              key={i}
            >
              <div className="flex justify-between items-center">
                <Skeleton className="w-14 h-14 rounded-full" />
                <Skeleton className="h-5 w-1/3" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-11/12" />
                <Skeleton className="h-3 w-10/12" />
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
              </div>
            </div>
          ))}
        {data &&
          data?.map((singleAuthor) => (
            <AuthorCard key={singleAuthor.id} authorData={singleAuthor} />
          ))}
      </div>
    </div>
  );
};

export default AuthorsPage;
