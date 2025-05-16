import { useForm } from "react-hook-form";
import { Form } from "../../components/ui/form";
import FormBuilder from "../../components/forms/FormBuilder";
import useBlogFormData from "../../hooks/useBlogFormData";

const CreateEditBlogPage = () => {
  const form = useForm();
  const { fields } = useBlogFormData();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <Form {...form}>
        <FormBuilder
          control={form.control}
          errors={form.formState.errors}
          fields={fields}
          getValues={form.getValues}
          register={form.register}
          handleSubmit={form.handleSubmit}
          onSubmit={onSubmit}
          reset={form.reset}
          type="create"
        />
      </Form>
    </>
  );
};

export default CreateEditBlogPage;
