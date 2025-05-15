type FormInputType = { [key: string]: string | number | null | undefined };

import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import type { IFormItem } from "../../types/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import QuillEditor from "./quill/QuillEditor";

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
  //   console.log(register, errors, control, formItem);
  return (
    <>
      {formItem?.type === "text" && (
        <FormField
          control={control}
          name={formItem?.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {formItem.label}{" "}
                {!formItem?.optional && <span className="text-red-500">*</span>}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={formItem?.placeholder ?? "Enter text..."}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage>{errors[formItem.name]?.message}</FormMessage>
            </FormItem>
          )}
        />
      )}
      {
        //Quill Component
        formItem?.type === "quill" && (
          <Controller
            name={formItem?.name}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <QuillEditor
                //@ts-ignore
                value={value}
                onChange={onChange}
                label={
                  <p>
                    {formItem?.label}{" "}
                    {!formItem?.optional && (
                      <span className="text-red-500">*</span>
                    )}
                  </p>
                }
              />
            )}
          />
        )
      }
    </>
  );
};

export default FormComponent;
