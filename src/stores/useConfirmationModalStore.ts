import { create } from "zustand";

type ModalStore = {
  action?: "edit" | "create" | "delete";
  onConfirm: (() => void) | null;
  isOpen: boolean;
  open: (onConfirm: () => void, action?: "edit" | "create" | "delete") => void;
  close: () => void;
  onClose?: () => void;
};

export const useConfirmationModalStore = create<ModalStore>((set) => ({
  action: undefined,
  onConfirm: null,
  isOpen: false,
  open: (onConfirm, action) => set({ isOpen: true, onConfirm, action }),
  close: () => set({ isOpen: false, action: undefined, onClose: undefined }),
}));
