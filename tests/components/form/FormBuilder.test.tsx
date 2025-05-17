import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import FormBuilder from "../../../src/components/forms/FormBuilder";
import type { IFormItem } from "../../../src/types/form";
import "@testing-library/jest-dom";
import { Form } from "../../../src/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userEvent from "@testing-library/user-event";

const validationSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be more than 10 characters")
    .max(150, "Title cannot be more 150 characters"),
  desctiption: z.string().optional(),
});

const fields: IFormItem[] = [
  { name: "title", label: "Title", type: "text" },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    optional: true,
  },
];

type ValidationSchemaType = z.infer<typeof validationSchema>;

const Wrapper = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const form = useForm<ValidationSchemaType>({
    resolver: zodResolver(validationSchema),
  });

  return (
    <Form {...form}>
      <FormBuilder
        register={form.register}
        control={form.control}
        handleSubmit={form.handleSubmit}
        onSubmit={onSubmit}
        errors={form.formState.errors}
        reset={form.reset}
        getValues={form.getValues}
        fields={fields}
        type="create"
      />
    </Form>
  );
};

describe("FormBuilder", () => {
  it("should render all field labels provided to it", () => {
    const onSubmit = vi.fn();

    render(<Wrapper onSubmit={onSubmit} />);

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  it("should show * for required fields", () => {
    const onSubmit = vi.fn();
    render(<Wrapper onSubmit={onSubmit} />);

    expect(screen.getByLabelText(/Title\s*\*/)).toBeInTheDocument();

    expect(screen.queryByText(/Description\s*\*/)).not.toBeInTheDocument();
  });

  it("should prevent submission required fields are not filled", async () => {
    const onSubmit = vi.fn();
    render(<Wrapper onSubmit={onSubmit} />);

    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.click(submitButton);

    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("should show errors thrown from zod schema", async () => {
    const onSubmit = vi.fn();
    render(<Wrapper onSubmit={onSubmit} />);

    const submitButton = screen.getByRole("button", { name: /submit/i });

    const title = screen.getByLabelText("Title");
    await userEvent.type(title, "Short");

    await userEvent.click(submitButton);

    expect(
      screen.getByText("Title must be more than 10 characters")
    ).toBeInTheDocument();
  });

  it("should not add required validation for optional fields", async () => {
    const onSubmit = vi.fn();
    render(<Wrapper onSubmit={onSubmit} />);

    const submitButton = screen.getByRole("button", { name: /submit/i });

    const title = screen.getByLabelText("Title");
    await userEvent.type(
      title,
      "Valid title with length more than 10 characters"
    );

    await userEvent.click(submitButton);

    expect(screen.queryByText("Required")).not.toBeInTheDocument();
  });
});
