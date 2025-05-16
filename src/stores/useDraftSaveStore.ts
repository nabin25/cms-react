import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FormType {
  title: string;
  content: string;
  author_id: string;
  category_id: string;
  status: string;
  cover_image: string;
  tags: { label: string; value: string }[];
}

interface DraftState {
  formState: FormType;
  setFormState: (data: Partial<FormType>) => void;
  save: () => void;
  clear: () => void;
}

const useDraftSaveStore = create<DraftState>()(
  persist(
    (set, get) => ({
      formState: {
        title: "",
        content: "",
        author_id: "",
        category_id: "",
        status: "",
        cover_image: "",
        tags: [],
      },
      setFormState: (data) =>
        set((state) => ({
          formState: {
            ...state.formState,
            ...data,
          },
        })),
      save: () => {},
      clear: () =>
        set({
          formState: {
            title: "",
            content: "",
            author_id: "",
            category_id: "",
            status: "",
            cover_image: "",
            tags: [],
          },
        }),
    }),
    {
      name: "form-draft-storage",
    }
  )
);

export default useDraftSaveStore;
