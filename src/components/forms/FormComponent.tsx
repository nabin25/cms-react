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
import CreatableSelect from "./select/CreatableSelect";
import { Textarea } from "../ui/textarea";
import { Trash2 } from "lucide-react";

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
  return (
    <div className="mb-2">
      {formItem?.type === "image" && (
        <FormField
          control={control}
          name={formItem?.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {formItem.label}{" "}
                {!formItem?.optional && <span className="text-red-500">*</span>}
              </FormLabel>
              <div className="relative aspect-square w-32 group hover:ring-1 ring-accent transition">
                <img
                  alt="image"
                  className="object-contain"
                  src={
                    field.value?.toString() && field.value?.toString() !== ""
                      ? field.value?.toString()
                      : undefined
                  }
                />
                {field?.value && (
                  <Trash2
                    onClick={() => field.onChange(null)}
                    className="text-red-600 absolute right-2 top-2 text-body cursor-pointer hidden group-hover:flex transition"
                  />
                )}
              </div>
              <FormControl>
                <Input
                  aria-label={formItem.label}
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
              aria-label={formItem.label}
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
      {formItem.type === "textarea" && (
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
                <Textarea
                  aria-label={formItem.label}
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
      {formItem.type === "select" && (
        <Controller
          name={formItem?.name}
          control={control}
          render={({ field: { value = null, onChange } }) => (
            <SelectComponent
              aria-label={formItem.label}
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
      {formItem.type === "creatable-select" && (
        <Controller
          name={formItem?.name}
          control={control}
          render={({ field: { value = null, onChange } }) => (
            <CreatableSelect
              aria-label={formItem.label}
              className="flex flex-1 flex-col !h-full min-w-60"
              options={formItem.options || [{ label: "", value: "" }]}
              label={
                <p className="flex font-medium dark:text-white items-center gap-2">
                  {formItem.label}{" "}
                  {formItem.optional ? (
                    ""
                  ) : (
                    <span className="text-red-500">*</span>
                  )}
                </p>
              }
              menuPortalTarget={document.body}
              onChange={(selected: any) => {
                onChange(selected);
              }}
              onCreateOption={(input: string) => {
                const tempData = { label: input, value: input };
                //@ts-ignore
                const newValues = value ? [...value, tempData] : [tempData];
                onChange(newValues);
                formItem?.setOptions &&
                  formItem?.setOptions((prev) => [...prev, tempData]);
              }}
              value={value}
              error={errors[formItem.name]?.message}
            />
          )}
        />
      )}
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
                  aria-label={formItem.label}
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
    </div>
  );
};

export default FormComponent;
