import { useForm } from "react-hook-form";
import FormBuilder from "../../components/forms/FormBuilder";
import { Form } from "../../components/ui/form";
import type { IFormItem } from "../../types/form";

const HomePage = () => {
  const form = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const fields: IFormItem[] = [
    {
      ariaLabel: "Field one",
      name: "field_one",
      label: "Field One",
      placeholder: "Field one ...",
      type: "text",
      colSize: 4,
    },
    {
      ariaLabel: "Field two",
      name: "field_two",
      label: "Field two",
      placeholder: "Field two ...",
      type: "text",
      colSize: 8,
    },
    {
      ariaLabel: "Field three",
      name: "field_three",
      label: "Field three",
      placeholder: "Field three ...",
      type: "text",
      colSize: 12,
    },
  ];
  return (
    <>
      <Form {...form}>
        <FormBuilder
          control={form.control}
          errors={form.formState.errors}
          fields={fields}
          getValues={form.getValues}
          reset={form.reset}
          register={form.register}
          handleSubmit={form.handleSubmit}
          onSubmit={onSubmit}
          type="create"
        />
      </Form>
    </>
  );
};

export default HomePage;
