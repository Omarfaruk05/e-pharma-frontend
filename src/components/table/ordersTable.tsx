"use client";
import { useDeleteOrderMutation } from "@/redux/api/orderApi";
import { getUserInfo } from "@/services/auth.service";
import { useEffect, useState } from "react";
import { ImPencil, ImBin } from "react-icons/im";
import { toast } from "react-toastify";

const OrdersTable = ({ orders }: any) => {
  const [userRole, setUserRole] = useState("");
  const { role } = getUserInfo() as any;
  const [deleteOrder] = useDeleteOrderMutation();

  const handleDeleteOrder = async (id: string) => {
    try {
      const res = await deleteOrder(id).unwrap();

      if (res?._id) {
        toast.success("Order deleted successfully.");
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  useEffect(() => {
    setUserRole(role);
  }, [userRole]);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border">
        <thead className="bg-sky-400 text-white">
          <tr>
            <th className="p-4 border-b">Products</th>
            <th className="p-4 border-b">Shipping Address</th>
            <th className="p-4 border-b">Order Status</th>
            <th className="p-4 border-b">Payment Status</th>
            <th className="p-4 border-b">Order Date</th>
            {(userRole === "admin" || userRole === "super-admin") && (
              <th className="p-4 border-b">Actions</th>
            )}
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
                <td className="py-2 px-4 border-b text-center">
                  {order.shippingAddress.address},
                </td>
                <td className="py-2 px-4 border-b text-center bg-yellow-100">
                  {order.orderStatus}
                </td>
                <td className="py-2 px-4 border-b text-center bg-cyan-100">
                  {order.paymentStatus}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>{" "}
                {(userRole === "admin" || userRole === "super-admin") && (
                  <td className="py-2 px-4 border-b text-center">
                    <div className="flex gap-6 items-center justify-center">
                      <ImPencil
                        className="text-blue-400 cursor-pointer"
                        size={28}
                      />
                      <ImBin
                        onClick={() => handleDeleteOrder(order?._id)}
                        className="text-red-500 cursor-pointer"
                        size={28}
                      />
                    </div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
