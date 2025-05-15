type FormInputType = { [key: string]: string | number | null | undefined };

import React from "react";
import type {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import FormComponent from "./FormComponent";

import { Button } from "../ui/button";
import type { IFormItem } from "../../types/form";
import { cn } from "../../lib/utils";
import { useConfirmationModalStore } from "../../stores/useConfirmationModalStore";

interface IFormBuilderProps {
  register: UseFormRegister<FormInputType>;
  errors: FieldErrors<FormInputType>;
  control: Control<FormInputType>;
  handleSubmit: UseFormHandleSubmit<FormInputType>;
  onSubmit: SubmitHandler<FormInputType>;
  fields: IFormItem[];
  reset: UseFormReset<any>;
  getValues: UseFormGetValues<any>;
  children?: React.ReactNode;
  isLoading?: boolean;
  type: "edit" | "delete";
}

const FormBuilder = ({
  fields,
  handleSubmit,
  onSubmit,
  register,
  control,
  errors,
  reset,
  children,
  isLoading,
  type,
}: IFormBuilderProps) => {
  const { close, open } = useConfirmationModalStore();

  const handleSubmitConfirmation = () => {
    open(() => {
      handleSubmit(onSubmit)();
      close();
    }, type);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitConfirmation)}>
      <div className="lg:grid lg:grid-cols-12 gap-4 mb-6">
        {fields.map((singleField, fieldIndex) => (
          <div
            key={fieldIndex}
            className={cn(
              "col-span-12",
              `col-span-${singleField.colSize ?? 12}`
            )}
          >
            <FormComponent
              key={fieldIndex}
              register={register}
              errors={errors}
              control={control}
              formItem={singleField}
            />
          </div>
        ))}
      </div>

      {children}
      <div className={`flex items-center gap-4 mt-8`}>
        <Button
          disabled={isLoading}
          className="flex items-center justify-center gap-1 py-1"
          type="submit"
        >
          Submit
        </Button>
        <Button
          variant="outline"
          onClick={() => reset()}
          className="py-1 flex items-center justify-center gap-1"
        >
          Reset
        </Button>
      </div>
    </form>
  );
};

export default FormBuilder;
