"use client";
import React, { useState } from "react";
import Input from "./Input";
import { toast } from "react-toastify";
import { useAddVariantMutation } from "@/redux/api/variantApi";

const CreateVariantForm = () => {
  const [formValues, setFormValues] = useState({
    productName: "",
    variant: "",
    price: "",
    quantity: "",
  });

  const [createVariant] = useAddVariantMutation();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCreateVariant = async (event: any) => {
    event.preventDefault();
    const {
      productName,
      variant,
      price: priceString,
      quantity: quantityString,
    } = formValues;
    const price = Number(priceString);
    const quantity = Number(quantityString);
    const newVariant = { productName, variant, price, quantity };

    console.log(newVariant);

    try {
      const res = await createVariant(newVariant).unwrap();

      if (res?._id) {
        toast.success("Variant created successfully.");
      }
    } catch (error: any) {
      toast.error("Failed to create variant.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <form onSubmit={handleCreateVariant} className="text-black space-y-4">
        <p className="text-sm text-center my-1 text-white">Create Variant</p>

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
          value={"Create Variant"}
        />
      </form>
    </div>
  );
};

export default CreateVariantForm;
