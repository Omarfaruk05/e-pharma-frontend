"use client";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetVariantsQuery } from "@/redux/api/variantApi";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/redux/api/productApi";
import { ICategory, IVariant } from "@/types";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Input from "@/components/form/Input";

interface FormValues {
  name: string;
  slug: string;
  photos: string[];
  description: string;
  metaKey: string;
  price: number;
  discount: number;
  stockStatus: boolean;
  status: boolean;
  primaryCategory: string;
  secondaryCategory: string;
  tertiaryCategory: string;
  variants: string[];
}

const UpdateProductPage = ({ params }: { params: { id: string } }) => {
  const id: string = params.id;

  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    slug: "",
    photos: [],
    description: "",
    metaKey: "",
    price: 0,
    discount: 0,
    stockStatus: true,
    status: true,
    primaryCategory: "",
    secondaryCategory: "",
    tertiaryCategory: "",
    variants: [],
  });

  const { data: productData, isLoading } = useGetSingleProductQuery(id);

  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (productData) {
      setFormValues({
        name: productData.name,
        slug: productData.slug,
        photos: productData.photos,
        description: productData.description,
        metaKey: productData.metaKey,
        price: productData.price,
        discount: productData.discount,
        stockStatus: productData.stockStatus,
        status: productData.status,
        primaryCategory: productData?.categories?.primary?._id,
        secondaryCategory: productData?.categories?.secondary._id,
        tertiaryCategory: productData?.categories?.tertiary._id,
        variants: productData.variants?.map((variant: any) => variant?._id),
      });
    }
  }, [productData]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    const newValue =
      name === "price" || name === "discount" ? Number(value) : value;
    setFormValues({
      ...formValues,
      [name]: newValue,
    });
  };

  const handlePhotosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormValues({
      ...formValues,
      photos: value.split(",").map((url) => url.trim()),
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      name,
      slug,
      photos,
      description,
      metaKey,
      price,
      discount,
      stockStatus,
      status,
    } = formValues;

    const product = {
      name,
      slug,
      photos,
      description,
      metaKey,
      price,
      discount,
      stockStatus,
      status,
      categories: {
        primary: productData?.categories?.primary?._id,
        secondary: productData?.categories?.secondary?._id,
        tertiary: productData?.categories?.tertiary?._id,
      },
      variants: productData?.variants?.map((variant: any) => variant?._id),
    };
    console.log(product);
    try {
      const res = await updateProduct({ id, ...product }).unwrap();

      if (res?._id) {
        toast.success("Product updated successfully!");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-5xl mx-auto">
      <Input
        type="text"
        name="name"
        id="name"
        placeholder="Product Name"
        value={formValues.name}
        onChange={handleChange}
      />

      <Input
        type="text"
        name="slug"
        id="slug"
        placeholder="Slug"
        value={formValues.slug}
        onChange={handleChange}
      />

      <Input
        type="text"
        name="metaKey"
        id="metaKey"
        placeholder="Meta Key"
        value={formValues.metaKey}
        onChange={handleChange}
      />

      <Input
        type="text"
        name="photos"
        id="photos"
        placeholder="Photo URLs (comma-separated)"
        value={formValues.photos.join(", ")}
        onChange={handlePhotosChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formValues.description}
        onChange={handleChange}
        required
        className="w-full border border-gray-200 rounded-md p-2 min-h-40"
      />

      <div className="flex gap-4">
        <Input
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          value={String(formValues.price)}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="discount"
          id="discount"
          placeholder="Discount"
          value={String(formValues.discount)}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-sky-500 text-white p-2 rounded-md hover:bg-sky-600"
      >
        Update Product
      </button>
    </form>
  );
};

export default UpdateProductPage;
