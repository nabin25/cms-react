import useFetchAuthors from "../../api/authors/useFetchAuthors";
import { Skeleton } from "../../components/ui/skeleton";
import AuthorCard from "../../features/authors/AuthorCard";

const AuthorsPage = () => {
  const { data, isLoading } = useFetchAuthors();
  return (
    <>
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
