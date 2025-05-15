type FormInputType = { [key: string]: string | number | null | undefined };

import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { IFormItem } from "../../types/form";

interface FormComponentProps {
  register: UseFormRegister<FormInputType>;
  errors: FieldErrors<FormInputType>;
  control: Control<FormInputType>;
  formItem: IFormItem;
}

const FormComponent = ({
  register,
  errors,
  control,
  formItem,
}: FormComponentProps) => {
  console.log(register, errors, control, formItem);
  return <>FormComponent</>;
};

export default FormComponent;
