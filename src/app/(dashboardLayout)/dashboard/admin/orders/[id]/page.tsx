"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
} from "@/redux/api/orderApi";
import { IOrder } from "@/types";
import { useParams } from "next/navigation";

const UpdateOrderPage = () => {
  const { id } = useParams();
  const { data: orderData } = useGetSingleOrderQuery(id);
  const [updateOrder] = useUpdateOrderMutation();

  const [formValues, setFormValues] = useState<
    Pick<IOrder, "orderStatus" | "paymentStatus">
  >({
    orderStatus: "Pending",
    paymentStatus: "Pending",
  });

  useEffect(() => {
    if (orderData) {
      setFormValues({
        orderStatus: orderData.orderStatus,
        paymentStatus: orderData.paymentStatus,
      });
    }
  }, [orderData]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value as any,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await updateOrder({ id, ...formValues }).unwrap();
      if (res?._id) {
        toast.success("Order updated successfully.");
      }
    } catch (error: any) {
      toast.error("Failed to update order.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h1 className="text-center text-xl font-semibold mb-4">Update Order</h1>

      <div>
        <label htmlFor="orderStatus" className="block mb-1">
          Order Status
        </label>
        <select
          id="orderStatus"
          name="orderStatus"
          value={formValues.orderStatus}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div>
        <label htmlFor="paymentStatus" className="block mb-1">
          Payment Status
        </label>
        <select
          id="paymentStatus"
          name="paymentStatus"
          value={formValues.paymentStatus}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Update Order
      </button>
    </form>
  );
};

export default UpdateOrderPage;
