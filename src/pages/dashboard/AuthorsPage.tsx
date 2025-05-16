import useFetchAuthors from "../../api/authors/useFetchAuthors";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";
import AuthorCard from "../../features/authors/AuthorCard";
import CreateEditAuthor from "../../features/authors/CreateEditAuthor";
import { useModalStore } from "../../stores/useModalStore";

const AuthorsPage = () => {
  const { data, isLoading } = useFetchAuthors();
  const { open } = useModalStore();
  return (
    <>
      <div className="flex justify-end py-5">
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
    </>
  );
};

export default AuthorsPage;
