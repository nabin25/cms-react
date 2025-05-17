import { useForm } from "react-hook-form";
import { Form } from "../../components/ui/form";
import FormBuilder from "../../components/forms/FormBuilder";
import useBlogFormData from "../../hooks/useBlogFormData";
import { blogSchema, type BlogData } from "../../schemas/blog.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateBlog from "../../api/blogs/useCreateBlog";
import useFetchBlogById from "../../api/blogs/useFetchBlogById";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useEditBlog from "../../api/blogs/useEditBlog";
import toast from "react-hot-toast";
import routes from "../../routes/routes";
import useDraftSaveStore from "../../stores/useDraftSaveStore";
import { useConfirmationModalStore } from "../../stores/useConfirmationModalStore";
import LoadingOverlay from "../../components/LoadingOverlay";

const CreateEditBlogPage = () => {
  const { formState: draft, setFormState, clear } = useDraftSaveStore();
  const [shouldAutoSave, setShouldAutoSave] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    document.title = id ? "Edit Blog" : "Create Blog";
  }, []);

  const { data: blogData, isLoading } = useFetchBlogById({ id: id });
  const tags = blogData?.tags;
  const form = useForm<BlogData>({
    resolver: zodResolver(blogSchema),
  });

  const {
    fields,
    setTagOption,
    isLoading: isOptionsLoading,
  } = useBlogFormData();
  const { open, close } = useConfirmationModalStore();

  const handleDraftRecover = () => {
    //@ts-ignore
    form.reset({ ...draft });
    close();
    setShouldAutoSave(true);
  };

  const handleDraftClear = () => {
    clear();
    close();
    setShouldAutoSave(true);
  };

  useEffect(() => {
    if (!id) {
      const isDraftNonEmpty =
        (draft?.content && draft?.content.length > 20) ||
        (draft?.title && draft?.title.length > 0) ||
        (draft?.cover_image && draft?.cover_image.length > 0) ||
        (Array.isArray(draft?.tags) && draft?.tags.length > 0);

      if (isDraftNonEmpty) {
        open(handleDraftRecover, "draft", handleDraftClear);
      } else {
        setShouldAutoSave(true);
      }
    }
  }, []);

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

  useEffect(() => {
    if (!shouldAutoSave) return;

    const interval = setInterval(() => {
      const currentValues = form.getValues();
      setFormState(currentValues);
    }, 5000);

    return () => clearInterval(interval);
  }, [shouldAutoSave]);

  const createMutation = useCreateBlog();

  const navigate = useNavigate();

  const editMutation = useEditBlog();
  const isCreateBlog = !id;

  const onSubmit = (data: BlogData) => {
    if (isCreateBlog) {
      createMutation.mutate(data, {
        onSuccess: () => {
          toast.success("Blog Created Successfully");
          clear();
          navigate(routes.blogs.home);
        },
        onError: () => {
          toast.error("Error Creating Blog");
        },
      });
    } else {
      editMutation.mutate(
        { formData: data, id: id },
        {
          onSuccess: () => {
            toast.success("Blog Edited Successfully");
            navigate(routes.blogs.home);
          },
          onError: () => {
            toast.error("Error Editing Blog");
          },
        }
      );
    }
  };
  return (
    <>
      <LoadingOverlay
        isVisible={
          createMutation.isPending ||
          editMutation?.isPending ||
          isLoading ||
          isOptionsLoading
        }
      />
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
