"use client";
import Input from "@/components/form/Input";
import {
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/categoryApi";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const UpdateCategoriesPage = ({ params }: { params: { id: string } }) => {
  const id: string = params.id;

  const { data: categoryData } = useGetSingleCategoryQuery(id);
  const [updateCategory] = useUpdateCategoryMutation();

  const [formValues, setFormValues] = useState({
    name: "",
    slug: "",
    thumbnail: "",
  });

  useEffect(() => {
    if (categoryData) {
      setFormValues({
        name: categoryData.name || "",
        slug: categoryData.slug || "",
        thumbnail: categoryData.thumbnail || "",
      });
    }
  }, [categoryData]);

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
      const res = await updateCategory({ id, ...formValues }).unwrap();
      if (res?._id) {
        toast.success("Category updated successfully.");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update category.");
    }
  };

  return (
    <div className="m-4">
      <h2 className="text-center text-3xl text-slate-700 font-bold my-8">
        Update Category
      </h2>
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
          placeholder="Thumbnail URL link"
          value={formValues.thumbnail}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default UpdateCategoriesPage;
