import type { IFormItem } from "../types/form";

const useCategoryFormData = () => {
  const fields: IFormItem[] = [
    {
      ariaLabel: "name",
      name: "name",
      label: "Category Name",
      placeholder: "Enter category name...",
      type: "text",
      colSize: 12,
    },

    {
      ariaLabel: "image url",
      name: "image",
      label: "Category Image",
      placeholder: "Enter category image url ...",
      type: "image",
      colSize: 12,
    },
  ];
  return { fields };
};

export default useCategoryFormData;
