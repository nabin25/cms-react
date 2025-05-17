import { DialogTitle } from "@radix-ui/react-dialog";
import { useConfirmationModalStore } from "../../stores/useConfirmationModalStore";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { ClipboardPenLine, Trash2 } from "lucide-react";
import { cn } from "../../lib/utils";

export const ConfirmationModal = () => {
  const { isOpen, close, onConfirm, action, onClose } =
    useConfirmationModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={onClose ?? close}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <h2 className="text-lg font-semibold">
          {action === "draft"
            ? "Recover Blog Draft"
            : action === "publish"
              ? "Publish blog"
              : action === "unpublish"
                ? "Unpublish blog"
                : `Confirm ${action ?? "action"}`}
          ?
        </h2>
        <div className="flex justify-center">
          {action ? (
            <>
              <div
                className={cn(
                  "flex items-center justify-center rounded-full w-14 aspect-square",
                  action === "delete"
                    ? "bg-red-100 dark:bg-red-700"
                    : "bg-blue-100 dark:bg-blue-800"
                )}
              >
                {action === "delete" ? (
                  <Trash2 className="text-red-700 dark:text-red-100" />
                ) : (
                  <ClipboardPenLine className="text-blue-700 dark:text-blue-100" />
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        {action === "draft" ? (
          <p className="text-sm text-muted-foreground text-center">
            Cancelling will permanantly remove the draft and cannot be
            recovered.
          </p>
        ) : action === "publish" ? (
          <p className="text-sm text-muted-foreground text-center">
            Are you sure you want to publish this blog? It will be visible to
            other users.
          </p>
        ) : action === "unpublish" ? (
          <p className="text-sm text-muted-foreground text-center">
            Are you sure you want to unpublish this blog? It will not be visible
            to other users.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground text-center">
            Please confirm if you want to proceed.
          </p>
        )}

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose ?? close}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (onConfirm) onConfirm();
            }}
            variant={action === "delete" ? "destructive" : "default"}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
