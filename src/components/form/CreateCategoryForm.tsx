"use client";
import { useAddCategoryMutation } from "@/redux/api/categoryApi";

import React, { useState } from "react";
import { toast } from "react-toastify";
import Input from "./Input";

const CreateCategoryForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    slug: "",
    thumbnail: "",
  });

  const [createCategory] = useAddCategoryMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await createCategory(formValues).unwrap();
      if (res?._id) {
        toast.success("Category created successfully.");
        setFormValues({ name: "", slug: "", thumbnail: "" });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create category.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-5xl mx-auto">
      <Input
        type="text"
        id="name"
        name="name"
        placeholder="Category Name"
        value={formValues.name}
        onChange={handleChange}
      />

      <Input
        type="text"
        id="slug"
        name="slug"
        placeholder="Slug"
        value={formValues.slug}
        onChange={handleChange}
      />

      <Input
        type="text"
        id="thumbnail"
        name="thumbnail"
        placeholder="Thubmnail URL link"
        value={formValues.thumbnail}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Create Category
      </button>
    </form>
  );
};

export default CreateCategoryForm;
