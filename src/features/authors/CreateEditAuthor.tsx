import { useForm } from "react-hook-form";
import FormBuilder from "../../components/forms/FormBuilder";
import type { IAuthor } from "../../types/author";
import { Form } from "../../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authorSchema, type AuthorType } from "../../schemas/author.schema";
import useCreateAuthor from "../../api/authors/useCreateAuthor";
import { useModalStore } from "../../stores/useModalStore";
import useEditAuthor from "../../api/authors/useEditAuthor";
import useAuthorFormData from "../../hooks/useAuthorFormData";
import toast from "react-hot-toast";
import LoadingOverlay from "../../components/LoadingOverlay";

const CreateEditAuthor = ({ authorData }: { authorData?: IAuthor }) => {
  const { close } = useModalStore();
  const isCreateAuthor = !authorData;

  const { fields } = useAuthorFormData();
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
          toast.success("Author created Successfully");
          close();
          form.reset();
        },
        onError: () => {
          toast.error("Error creating author");
        },
      });
    } else {
      editMutation.mutate(
        { formData: data, id: authorData.id },
        {
          onSuccess: () => {
            toast.success("Author edited Successfully");
            close();
            form.reset();
          },
          onError: () => {
            toast.error("Error editing author");
          },
        }
      );
    }
  };
  return (
    <>
      <LoadingOverlay
        isVisible={createMutation.isPending || editMutation?.isPending}
      />
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
