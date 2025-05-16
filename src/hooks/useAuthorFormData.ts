import type { IFormItem } from "../types/form";

const useAuthorFormData = () => {
  const fields: IFormItem[] = [
    {
      ariaLabel: "name",
      name: "name",
      label: "Author Name",
      placeholder: "Enter author name...",
      type: "text",
      colSize: 12,
    },
    {
      ariaLabel: "bio",
      name: "bio",
      label: "Bio",
      placeholder: "Enter author bio ...",
      type: "textarea",
      colSize: 12,
    },
    {
      ariaLabel: "image url",
      name: "avatar",
      label: "Avatar url",
      placeholder: "Enter author avatar url ...",
      type: "image",
      colSize: 12,
    },
  ];
  return { fields };
};

export default useAuthorFormData;
