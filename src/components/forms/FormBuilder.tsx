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
import type { ReactNode } from "react";

const getColSize = (colSize?: number) => {
  switch (colSize) {
    case 2:
      return "col-span-2";
    case 3:
      return "col-span-3";
    case 4:
      return "col-span-4";
    case 6:
      return "col-span-6";
    case 8:
      return "col-span-8";
    case 12:
      return "col-span-12";
    default:
      "col-span-12";
  }
};
interface IFormBuilderProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: SubmitHandler<any>;
  fields: IFormItem[];
  reset: UseFormReset<any>;
  getValues: UseFormGetValues<any>;
  children?: ReactNode;
  isLoading?: boolean;
  type: "edit" | "create";
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
      <div className="lg:grid lg:grid-cols-12 gap-4 mb-6 gap-y-4 py-3">
        {fields.map((singleField, fieldIndex) => (
          <div key={fieldIndex} className={cn(getColSize(singleField.colSize))}>
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
          type="button"
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
