import { create } from "zustand";

type ModalStore = {
  isOpen: boolean;
  open: ({ view, title }: { view: React.ReactNode; title: string }) => void;
  close: () => void;
  view: React.ReactNode;
  title: string;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  open: ({ view, title }) => set({ isOpen: true, view, title }),
  close: () => set({ isOpen: false }),
  view: <></>,
  title: "",
}));
