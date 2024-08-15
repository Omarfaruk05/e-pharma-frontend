"use client";

import OrdersTable from "@/components/table/OrdersTable";
import { useGetOrdersQuery } from "@/redux/api/orderApi";
import { IOrder } from "@/types";
import React from "react";

const AllOrdersPage = () => {
  return (
    <div className="m-4">
      <OrdersTable />
    </div>
  );
};

export default AllOrdersPage;
