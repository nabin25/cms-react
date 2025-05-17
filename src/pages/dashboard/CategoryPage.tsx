import { useSearchParams } from "react-router-dom";
import PaginationComponent from "../../components/pagination/PaginationComponent";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";
import CategoryCard from "../../features/categories/CategoryCard";
import CreateEditCategory from "../../features/categories/CreateEditCategory";
import { useModalStore } from "../../stores/useModalStore";
import useFetchPaginatedCategories from "../../api/categories/useFetchPaginatedCategories";
import NoDataFound from "../../components/NoDataFound";
import { useEffect } from "react";

const CategoryPage = () => {
  const { data, isLoading, isError } = useFetchPaginatedCategories();
  const { open } = useModalStore();

  const [params] = useSearchParams();
  const limit = params.get("limit") ?? "10";

  useEffect(() => {
    document.title = "Category Page";
  }, []);

  return (
    <div>
      <div className="flex sticky top-15 justify-between py-2 bg-white/40 dark:bg-black/40 backdrop-blur-md z-10 rounded-md pe-2">
        <PaginationComponent
          disableNext={!data || data.length !== parseInt(limit)}
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
      {!isLoading && (isError || !data || data.length === 0) && <NoDataFound />}

      <div className="flex flex-wrap gap-5 justify-center py-5 items-center">
        {isLoading &&
          Array.from({ length: 20 }).map((_, i) => (
            <div
              className="w-[350px] border rounded-lg p-4 shadow-sm space-y-4"
              key={i}
            >
              <div className="h-40 w-full overflow-hidden flex items-center justify-center rounded-md">
                <Skeleton className="h-full w-full rounded-md" />
              </div>

              <div className="mt-2 text-center">
                <Skeleton className="h-5 w-1/2 mx-auto" />
              </div>

              <div className="flex w-full justify-end gap-4 pt-2">
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
              </div>
            </div>
          ))}
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
