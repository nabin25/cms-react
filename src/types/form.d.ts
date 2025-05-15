export type IOption = {
  label: string;
  value: string;
};

export type IFormItem = {
  name: string;
  type: "text" | "textarea" | "quill" | "select" | "creatable-select" | "image";
  label: string;
  placeholder?: string;
  ariaLabel: string;
  colSize?: 2 | 3 | 4 | 6 | 8 | 12;
  optional?: boolean;
};
