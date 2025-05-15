import { DialogTitle } from "@radix-ui/react-dialog";
import { useConfirmationModalStore } from "../../stores/useConfirmationModalStore";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";

export const ConfirmationModal = () => {
  const { isOpen, close, onConfirm, action, onClose } =
    useConfirmationModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <h2 className="text-lg font-semibold">
          Confirm {action ?? "action"} ?
        </h2>
        <p className="text-sm text-muted-foreground">
          Please confirm if you want to proceed.
        </p>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose ?? close}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (onConfirm) onConfirm();
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
