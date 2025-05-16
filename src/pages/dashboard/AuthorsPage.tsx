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
      <div className="flex sticky top-15 justify-between py-5 bg-white/30 dark:bg-black/10 backdrop-blur-md">
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

      <div className="flex flex-wrap gap-5 justify-center items-center">
        {isLoading && <Skeleton />}
        {data &&
          data?.map((singleAuthor) => (
            <AuthorCard key={singleAuthor.id} authorData={singleAuthor} />
          ))}
      </div>
    </div>
  );
};

export default AuthorsPage;
