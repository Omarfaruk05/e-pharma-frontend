import { IOrder, IProduct } from "@/types";
import React from "react";

const OrdersTable = ({ orders }: any) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border">
        <thead className="bg-sky-400 rounded-t-lg text-white">
          <tr>
            <th className="py-2 px-4 border-b">Products</th>
            <th className="py-2 px-4 border-b">Shipping Address</th>
            <th className="py-2 px-4 border-b">Order Status</th>
            <th className="py-2 px-4 border-b">Payment Status</th>
            <th className="py-2 px-4 border-b">Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order: any) => (
              <tr key={order._id}>
                <td className="py-2 px-4 border-b">
                  <ol className="list-disc pl-3">
                    {order.products.map((product: any) => (
                      <li key={product._id}>{product.product.name}</li>
                    ))}
                  </ol>
                </td>
                <td className="py-2 px-4 border-b">
                  {order.shippingAddress.address},
                </td>
                <td className="py-2 px-4 border-b text-center bg-yellow-100 ">
                  {order.orderStatus}
                </td>
                <td className="py-2 px-4 border-b text-center bg-cyan-100">
                  {order.paymentStatus}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
