import { useSearchParams } from "react-router-dom";
import PaginationComponent from "../../components/pagination/PaginationComponent";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";
import CategoryCard from "../../features/categories/CategoryCard";
import CreateEditCategory from "../../features/categories/CreateEditCategory";
import { useModalStore } from "../../stores/useModalStore";
import useFetchPaginatedCategories from "../../api/categories/useFetchPaginatedCategories";

const CategoryPage = () => {
  const { data, isLoading } = useFetchPaginatedCategories();
  const { open } = useModalStore();

  const [params] = useSearchParams();
  const limit = params.get("limit") ?? "10";
  return (
    <div>
      <div className="flex sticky top-15 justify-between py-5 bg-white/30 dark:bg-black/10 backdrop-blur-md">
        <PaginationComponent
          disableNext={data && data.length !== parseInt(limit)}
        />
        <Button
          onClick={() =>
            open({ view: <CreateEditCategory />, title: "Create New Category" })
          }
        >
          Create Category
        </Button>
      </div>
      <div className="flex justify-end py-5"></div>

      <div className="flex flex-wrap gap-5 justify-center items-center">
        {isLoading && <Skeleton />}
        {data &&
          data?.map((singleCategory) => (
            <CategoryCard
              key={singleCategory.id}
              categoryData={singleCategory}
            />
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;
