"use client";

import OrdersTable from "@/components/table/ordersTable";
import { useGetOrdersQuery } from "@/redux/api/orderApi";
import { getUserInfo } from "@/services/auth.service";
import { IOrder, IProduct } from "@/types";

const Orders = () => {
  const query: Record<string, any> = {};
  const { _id } = getUserInfo() as any;
  query["userId"] = _id;

  const { data, isLoading } = useGetOrdersQuery({ ...query });
  const orders: IOrder[] = data?.orders;
  if (isLoading) {
    return <p> Loading...</p>;
  }
  return (
    <div className="p-4">
      <OrdersTable orders={orders} />
    </div>
  );
};

export default Orders;
