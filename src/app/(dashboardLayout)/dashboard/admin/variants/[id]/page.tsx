"use client";
import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import {
  useGetSingleVariantQuery,
  useUpdateVariantMutation,
} from "@/redux/api/variantApi";
import Input from "@/components/form/Input";

const UpdateVariantPage = ({ params }: { params: { id: string } }) => {
  const id: string = params.id;

  const { data: variantData } = useGetSingleVariantQuery(id);
  const [updateVariant] = useUpdateVariantMutation();

  const [formValues, setFormValues] = useState({
    productName: "",
    variant: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (variantData) {
      setFormValues({
        productName: variantData.productName || "",
        variant: variantData.variant || "",
        price: variantData.price?.toString() || "",
        quantity: variantData.quantity?.toString() || "",
      });
    }
  }, [variantData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleUpdateVariant = async (event: React.FormEvent) => {
    event.preventDefault();
    const {
      productName,
      variant,
      price: priceString,
      quantity: quantityString,
    } = formValues;
    const price = Number(priceString);
    const quantity = Number(quantityString);
    const updatedVariant = { productName, variant, price, quantity };

    try {
      const res = await updateVariant({ id, ...updatedVariant }).unwrap();
      if (res?._id) {
        toast.success("Variant updated successfully.");
      }
    } catch (error: any) {
      toast.error("Failed to update variant.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <form onSubmit={handleUpdateVariant} className="text-black space-y-4">
        <p className="text-sm text-center my-1 text-white">Update Variant</p>

        <div className="flex  flex-col md:flex-row gap-4">
          <Input
            type="text"
            name="productName"
            id="productName"
            placeholder="Product Name"
            value={formValues.productName}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="variant"
            id="variant"
            placeholder="Variant Name"
            value={formValues.variant}
            onChange={handleChange}
          />
        </div>
        <div className="flex  flex-col md:flex-row gap-4">
          <Input
            type="number"
            name="price"
            id="price"
            placeholder="Variant Price"
            value={formValues.price}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Stock Quantity"
            value={formValues.quantity}
            onChange={handleChange}
          />
        </div>

        <input
          className="bg-sky-800 text-white w-full p-2 rounded-md"
          type="submit"
          value={"Update Variant"}
        />
      </form>
    </div>
  );
};

export default UpdateVariantPage;
