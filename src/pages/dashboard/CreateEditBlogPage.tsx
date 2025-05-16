import { useForm } from "react-hook-form";
import { Form } from "../../components/ui/form";
import FormBuilder from "../../components/forms/FormBuilder";
import useBlogFormData from "../../hooks/useBlogFormData";
import { blogSchema, type BlogData } from "../../schemas/blog.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateBlog from "../../api/blogs/useCreateBlog";
import useFetchBlogById from "../../api/blogs/useFetchBlogById";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useEditBlog from "../../api/blogs/useEditBlog";

const CreateEditBlogPage = () => {
  const { id } = useParams();
  const { data: blogData } = useFetchBlogById({ id: id });
  const tags = blogData?.tags;
  const form = useForm<BlogData>({
    resolver: zodResolver(blogSchema),
  });
  const { fields, setTagOption } = useBlogFormData();

  useEffect(() => {
    if (blogData) {
      setTagOption(
        JSON.parse(blogData?.tags)?.map((tag: string) => ({
          label: tag,
          value: tag,
        }))
      );
      form.reset({
        title: blogData?.title,
        content: blogData?.content,
        category_id: blogData?.category_id,
        cover_image: blogData?.cover_image,
        author_id: blogData?.author_id,
        tags: tags
          ? JSON.parse(blogData?.tags)?.map((tag: string) => ({
              label: tag,
              value: tag,
            }))
          : [],
        status: blogData?.status,
      });
    }
  }, [blogData]);

  const createMutation = useCreateBlog();

  const editMutation = useEditBlog();
  const isCreateBlog = !id;
  const onSubmit = (data: BlogData) => {
    if (isCreateBlog) {
      createMutation.mutate(data, {
        onSuccess: () => {
          console.log("Blog Created Successfully");
        },
        onError: () => {
          console.log("Error Creating Blog");
        },
      });
    } else {
      editMutation.mutate(
        { formData: data, id: id },
        {
          onSuccess: () => {
            console.log("Blog Edited Successfully");
          },
          onError: () => {
            console.log("Error Editing Blog");
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
