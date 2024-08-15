"use client";

import OrdersTable from "@/components/table/OrdersTable";
import { useGetOrdersQuery } from "@/redux/api/orderApi";
import { getUserInfo } from "@/services/auth.service";
import { IOrder } from "@/types";

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
    <div className="p-4 w-full">
      <OrdersTable orders={orders} />
    </div>
  );
};

export default Orders;
