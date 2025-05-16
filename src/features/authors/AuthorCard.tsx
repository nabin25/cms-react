import { Pencil, SquarePen, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { cn } from "../../lib/utils";
import type { IAuthor } from "../../types/author";
import { Button } from "../../components/ui/button";
import useDeleteAuthor from "../../api/authors/useDeleteAuthor";
import { useConfirmationModalStore } from "../../stores/useConfirmationModalStore";
import CreateEditAuthor from "./CreateEditAuthor";
import { useModalStore } from "../../stores/useModalStore";
import toast from "react-hot-toast";
import LoadingOverlay from "../../components/LoadingOverlay";

const AuthorCard = ({ authorData }: { authorData: IAuthor }) => {
  const deleteMutation = useDeleteAuthor();

  const { open, close } = useConfirmationModalStore();

  const { open: openModal } = useModalStore();

  const handleDelete = () => {
    deleteMutation.mutate(authorData.id, {
      onSuccess: () => {
        toast.success("Author Deleted Successfully");
        close();
      },
      onError: () => {
        toast.error("Error deleting author");
        close();
      },
    });
  };
  return (
    <Card className={cn("w-[350px]")}>
      <LoadingOverlay isVisible={deleteMutation.isPending} />
      <CardHeader>
        <div className="flex justify-between place-items-center">
          <img
            className="w-14 aspect-square rounded-full"
            src={authorData.avatar}
            alt={authorData.name}
          />
          <CardTitle>{authorData?.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="h-[120px]">
        <CardDescription>
          <p className="mb-2">
            Member since{" "}
            <strong>{new Date(authorData.created_at)?.toDateString()}</strong>
          </p>

          <p>
            <Pencil className="inline w-4" /> <strong>Bio</strong>
          </p>
          <p className="line-clamp-3">{authorData?.bio}</p>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-end gap-4">
          <Button
            variant="ghost"
            onClick={() =>
              openModal({
                view: <CreateEditAuthor authorData={authorData} />,
                title: "Edit Author",
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
export default AuthorCard;
