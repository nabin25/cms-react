import { useForm } from "react-hook-form";
import FormBuilder from "../../components/forms/FormBuilder";
import type { IAuthor } from "../../types/author";
import { Form } from "../../components/ui/form";
import type { IFormItem } from "../../types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authorSchema, type AuthorType } from "../../schemas/author.schema";
import useCreateAuthor from "../../api/authors/useCreateAuthor";
import { useModalStore } from "../../stores/useModalStore";
import useEditAuthor from "../../api/authors/useEditAuthor";

const CreateEditAuthor = ({ authorData }: { authorData?: IAuthor }) => {
  const { close } = useModalStore();
  const isCreateAuthor = !authorData;

  const fields: IFormItem[] = [
    {
      ariaLabel: "name",
      name: "name",
      label: "Author Name",
      placeholder: "Enter author name...",
      type: "text",
      colSize: 12,
    },
    {
      ariaLabel: "bio",
      name: "bio",
      label: "Bio",
      placeholder: "Enter author bio ...",
      type: "textarea",
      colSize: 12,
    },
    {
      ariaLabel: "image url",
      name: "avatar",
      label: "Avatar url",
      placeholder: "Enter author avatar url ...",
      type: "text",
      colSize: 12,
    },
  ];
  const form = useForm<AuthorType>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      name: authorData?.name,
      bio: authorData?.bio,
      avatar: authorData?.avatar,
    },
  });

  const createMutation = useCreateAuthor();
  const editMutation = useEditAuthor();

  const onSubmit = (data: AuthorType) => {
    if (isCreateAuthor) {
      createMutation.mutate(data, {
        onSuccess: () => {
          console.log("Author created Successfully");
          close();
          form.reset();
        },
        onError: () => {
          console.log("Error creating author");
        },
      });
    } else {
      editMutation.mutate(
        { formData: data, id: authorData.id },
        {
          onSuccess: () => {
            console.log("Author edited Successfully");
            close();
            form.reset();
          },
          onError: () => {
            console.log("Error editing author");
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
          type={isCreateAuthor ? "create" : "edit"}
        />
      </Form>
    </>
  );
};
export default CreateEditAuthor;
