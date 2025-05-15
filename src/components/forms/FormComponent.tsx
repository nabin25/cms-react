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
import SelectComponent from "./select/SelectComponent";

interface FormComponentProps {
  register: UseFormRegister<FormInputType>;
  errors: FieldErrors<FormInputType>;
  control: Control<FormInputType>;
  formItem: IFormItem;
}

const FormComponent = ({
  // register,
  errors,
  control,
  formItem,
}: FormComponentProps) => {
  //   console.log(register, errors, control, formItem);
  return (
    <div className="mb-2">
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
      {formItem?.type === "quill" && (
        <Controller
          name={formItem?.name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <QuillEditor
              //@ts-ignore
              value={value}
              onChange={onChange}
              label={
                <p className="flex font-medium text-sm dark:text-white items-center gap-2">
                  {formItem?.label}{" "}
                  {!formItem?.optional && (
                    <span className="text-red-500">*</span>
                  )}
                </p>
              }
            />
          )}
        />
      )}
      {formItem.type === "select" && (
        <Controller
          name={formItem?.name}
          control={control}
          render={({ field: { value = null, onChange } }) => (
            <SelectComponent
              className="min-w-60"
              options={formItem.options || [{ label: "", value: "" }]}
              value={formItem?.options?.find((c) => c.value === value) || ""}
              label={
                <p className="flex font-medium text-sm dark:text-white items-center gap-2">
                  {formItem.label}{" "}
                  {!formItem.optional && (
                    <span className="text-red-500">*</span>
                  )}
                </p>
              }
              onChange={(selected: any) => {
                onChange(selected?.value);
              }}
              error={errors[formItem.name]?.message}
            />
          )}
        />
      )}
    </div>
  );
};

export default FormComponent;
