import { create } from "zustand";

type ModalStore = {
  action?: "edit" | "create" | "delete" | "draft";
  onConfirm: (() => void) | null;
  isOpen: boolean;
  open: (
    onConfirm: () => void,
    action?: "edit" | "create" | "delete" | "draft",
    onClose?: () => void
  ) => void;
  close: () => void;
  onClose?: () => void;
};

export const useConfirmationModalStore = create<ModalStore>((set) => ({
  action: undefined,
  onConfirm: null,
  isOpen: false,
  open: (onConfirm, action, onClose) =>
    set({ isOpen: true, onConfirm, action, onClose }),
  close: () => set({ isOpen: false, action: undefined, onClose: undefined }),
}));
