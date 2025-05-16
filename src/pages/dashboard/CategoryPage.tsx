import useFetchCategories from "../../api/categories/useFetchCategories";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";
import CategoryCard from "../../features/categories/CategoryCard";
import CreateEditCategory from "../../features/categories/CreateEditCategory";
import { useModalStore } from "../../stores/useModalStore";

const CategoryPage = () => {
  const { data, isLoading } = useFetchCategories();
  const { open } = useModalStore();
  return (
    <>
      <div className="flex justify-end py-5">
        <Button
          onClick={() =>
            open({ view: <CreateEditCategory />, title: "Create New Category" })
          }
        >
          Create Category
        </Button>
      </div>

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
    </>
  );
};

export default CategoryPage;
