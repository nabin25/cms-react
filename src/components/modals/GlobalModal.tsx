import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { useModalStore } from "../../stores/useModalStore";
import { Button } from "../ui/button";

export const GlobalModal = () => {
  const { view, title, isOpen, close } = useModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogTitle></DialogTitle>
      <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen">
        <h2 className="text-lg font-semibold">{title}</h2>
        {view}
        <DialogFooter>
          <div className="flex justify-end">
            <Button onClick={() => close()}>Close</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
