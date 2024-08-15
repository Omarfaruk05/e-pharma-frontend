"use client";

import OrdersTable from "@/components/table/OrdersTable";
import { useGetOrdersQuery } from "@/redux/api/orderApi";
import { IOrder } from "@/types";
import React from "react";

const AllOrdersPage = () => {
  const query: Record<string, any> = {};

  const { data, isLoading } = useGetOrdersQuery({ ...query });
  const orders: IOrder[] = data?.orders;

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="m-4">
      <OrdersTable orders={orders} />
    </div>
  );
};

export default AllOrdersPage;
