"use client";

import React, { useState } from "react";
import Input from "./Input";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useAddShippingAddressMutation } from "@/redux/api/shippingAddressApi";
import { useSelector } from "react-redux";
import { calculateAvailablePrice } from "@/utils/calfulateAvailablePrice";
import { getUserInfo } from "@/services/auth.service";
import { useAddOrderMutation } from "@/redux/api/orderApi";

const ShippingAddressFrom = ({
  close,
  isCheckout,
}: {
  close: () => void;
  isCheckout: () => void;
}) => {
  const { _id: userId } = getUserInfo() as any;
  const [formValues, setFormValues] = useState({
    name: "",
    division: "",
    district: "",
    subDistrict: "",
    address: "",
    phone: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [addShippingAddress] = useAddShippingAddressMutation();
  const [addOrder] = useAddOrderMutation();
  const { cart } = useSelector((state: any) => state?.cart);
  const products = cart.map((item: any) => ({
    product: item._id,
    variant: item.variantId,
    quantity: item.quantity,
    price: Number(
      calculateAvailablePrice(item.price, item.discount).toFixed(2)
    ),
  }));

  const handleOrder = async (event: any) => {
    event.preventDefault();
    const { name, division, district, subDistrict, address, phone } =
      formValues;
    const data = { name, division, district, subDistrict, address, phone };

    try {
      const res = await addShippingAddress(data).unwrap();

      if (res?._id) {
        const shippingAddress = res?._id;
        const data = {
          userId,
          products,
          shippingAddress,
          paymentStatus: "Pending",
          orderStatus: "Processing",
          orderDate: Date.now().toString(),
        };
        try {
          const res = await addOrder(data).unwrap();

          console.log(res);
        } catch (error) {}
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative bg-sky-400 p-4 rounded-xl">
      <div className="absolute right-2 top-2 text-white">
        <IoCloseCircleOutline onClick={close} size={32} />
      </div>
      <form onSubmit={handleOrder} className="text-black space-y-4">
        <p className="text-sm  text-center my-1 text-white">
          Your Information to complete order.
        </p>
        <div className="flex gap-3">
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={formValues.name}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="division"
            id="division"
            placeholder="Division"
            value={formValues.division}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-3">
          <Input
            type="text"
            name="district"
            id="district"
            placeholder="District"
            value={formValues.district}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="subDistrict"
            id="subDistrict"
            placeholder="Sub-District"
            value={formValues.subDistrict}
            onChange={handleChange}
          />
        </div>
        <Input
          type="text"
          name="address"
          id="address"
          placeholder="Address"
          value={formValues.address}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="phone"
          id="phone"
          placeholder="Phone"
          value={formValues.phone}
          onChange={handleChange}
        />

        <input
          className=" bg-sky-800 text-white w-full p-2 rounded-md"
          type="submit"
          value={"Confirm Order"}
        />
      </form>
    </div>
  );
};

export default ShippingAddressFrom;
