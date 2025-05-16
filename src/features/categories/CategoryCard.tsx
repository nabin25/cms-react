import { SquarePen, Trash2 } from "lucide-react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { useConfirmationModalStore } from "../../stores/useConfirmationModalStore";
import CreateEditCategory from "./CreateEditCategory";
import { useModalStore } from "../../stores/useModalStore";
import type { ICategory } from "../../types/category";
import useDeleteCategory from "../../api/categories/useDeleteCategory";
import toast from "react-hot-toast";
import LoadingOverlay from "../../components/LoadingOverlay";

const CategoryCard = ({ categoryData }: { categoryData: ICategory }) => {
  const deleteMutation = useDeleteCategory();

  const { open, close } = useConfirmationModalStore();

  const { open: openModal } = useModalStore();

  const handleDelete = () => {
    deleteMutation.mutate(categoryData.id, {
      onSuccess: () => {
        toast.success("Category Deleted Successfully");
        close();
      },
      onError: () => {
        toast.error("Error deleting category");
        close();
      },
    });
  };
  return (
    <Card className={cn("w-[350px]")}>
      <LoadingOverlay isVisible={deleteMutation.isPending} />
      <CardHeader>
        <div className="h-40 w-full overflow-hidden flex items-center justify-center rounded-md">
          <img
            alt={categoryData.name}
            className="h-full object-contain"
            src={categoryData.image}
          />
        </div>
        <CardTitle className="mt-2 text-center">{categoryData?.name}</CardTitle>
      </CardHeader>
      <CardFooter>
        <div className="flex w-full justify-end gap-4">
          <Button
            variant="ghost"
            onClick={() =>
              openModal({
                view: <CreateEditCategory categoryData={categoryData} />,
                title: "Edit Category",
              })
            }
          >
            <SquarePen />
          </Button>
          <Button
            variant="destructive"
            onClick={() => open(handleDelete, "delete")}
          >
            <Trash2 />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
export default CategoryCard;
