"use client";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetVariantsQuery } from "@/redux/api/variantApi";
import { ICategory, IVariant } from "@/types";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Input from "./Input";
import { useAddProductMutation } from "@/redux/api/productApi";

interface FormValues {
  name: string;
  slug: string;
  photos: string[]; // Array of photo URLs
  description: string;
  metaKey: string;
  price: number;
  discount: number;
  stockStatus: boolean;
  status: boolean;
  primaryCategory: string;
  secondaryCategory: string;
  tertiaryCategory: string;
  variants: string[]; // Array of variant IDs
}

const CreateProductForm = () => {
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

  const [availableVariants, setAvailableVariants] = useState<IVariant[]>([]);
  const [myVariant, setMyVariant] = useState<string[]>([]);

  const { data: categoryData } = useGetCategoriesQuery({});
  const categories = categoryData?.categories;
  const { data: variantData } = useGetVariantsQuery({});
  const variants = variantData?.variants;

  const [addProduct] = useAddProductMutation();
  useEffect(() => {
    setAvailableVariants(variants || []);
  }, [variants]);

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
      photos: value.split(",").map((url) => url.trim()), // Convert comma-separated URLs to an array
    });
  };

  const handleVariantsChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setFormValues({ ...formValues, variants: selectedOptions });

    // Remove selected variants from the available variants list
    const updatedAvailableVariants = availableVariants?.filter(
      (variant: any) => !selectedOptions.includes(variant._id)
    );
    setAvailableVariants(updatedAvailableVariants);
    const variants = [...myVariant, selectedOptions[0]];
    setMyVariant(variants);
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
      primaryCategory,
      secondaryCategory,
      tertiaryCategory,
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
        primary: primaryCategory,
        secondary: secondaryCategory,
        tertiary: tertiaryCategory,
      },
      variants: myVariant,
    };

    console.log(product);
    try {
      const res = await addProduct(product).unwrap();

      if (res?._id) {
        toast.success("Product created successfully!");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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

      <div className="flex flex-col md:flex-row gap-3">
        <select
          name="primaryCategory"
          value={formValues.primaryCategory}
          onChange={handleChange}
          required
          className="p-2 border border-gray-200 rounded-md"
        >
          <option value="">Select Primary Category</option>
          {categories?.map((category: ICategory) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          name="secondaryCategory"
          value={formValues.secondaryCategory}
          onChange={handleChange}
          className="p-2 border border-gray-200 rounded-md"
        >
          <option value="">Select Secondary Category</option>
          {categories?.map((category: ICategory) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          name="tertiaryCategory"
          value={formValues.tertiaryCategory}
          onChange={handleChange}
          className="p-2 border border-gray-200 rounded-md"
        >
          <option value="">Select Tertiary Category</option>
          {categories?.map((category: ICategory) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="variants"
          className="block text-sm font-medium text-gray-700"
        >
          Variants
        </label>
        <select
          id="variants"
          name="variants"
          multiple
          value={formValues.variants}
          onChange={handleVariantsChange}
          className="mt-1 w-full min-h-60 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-700 overflow-y-scroll"
        >
          {availableVariants?.map((variant) => (
            <option
              className="bg-gray-100 mb-2 p-2 w-fit rounded-md inline-block mx-2"
              key={variant._id}
              value={variant._id}
            >
              {variant.productName} - {variant.variant} - ৳{variant.price}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-sky-500 text-white p-2 rounded-md hover:bg-sky-600"
      >
        Create Product
      </button>
    </form>
  );
};

export default CreateProductForm;
