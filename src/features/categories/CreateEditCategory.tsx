import { useForm } from "react-hook-form";
import FormBuilder from "../../components/forms/FormBuilder";
import { Form } from "../../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModalStore } from "../../stores/useModalStore";
import type { ICategory } from "../../types/category";
import {
  categorySchema,
  type CategoryType,
} from "../../schemas/category.schema";
import useCreateCategory from "../../api/categories/useCreateCategory";
import useEditCategory from "../../api/categories/useEditCategory";
import useCategoryFormData from "../../hooks/useCategoryFormData";
import toast from "react-hot-toast";

const CreateEditCategory = ({ categoryData }: { categoryData?: ICategory }) => {
  const { close } = useModalStore();
  const isCreateCategory = !categoryData;

  const { fields } = useCategoryFormData();
  const form = useForm<CategoryType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: categoryData?.name,
      image: categoryData?.image,
    },
  });

  const createMutation = useCreateCategory();
  const editMutation = useEditCategory();

  const onSubmit = (data: CategoryType) => {
    if (isCreateCategory) {
      createMutation.mutate(data, {
        onSuccess: () => {
          toast.success("Category created Successfully");
          close();
          form.reset();
        },
        onError: () => {
          toast.error("Error creating category");
        },
      });
    } else {
      editMutation.mutate(
        { formData: data, id: categoryData.id },
        {
          onSuccess: () => {
            toast.success("Category edited Successfully");
            close();
            form.reset();
          },
          onError: () => {
            toast.error("Error editing category");
          },
        }
      );
    }
  };
  return (
    <>
      <Form {...form}>
        <FormBuilder
          control={form.control}
          errors={form.formState.errors}
          fields={fields}
          getValues={form.getValues}
          handleSubmit={form.handleSubmit}
          onSubmit={onSubmit}
          register={form.register}
          reset={form.reset}
          type={isCreateCategory ? "create" : "edit"}
        />
      </Form>
    </>
  );
};
export default CreateEditCategory;
