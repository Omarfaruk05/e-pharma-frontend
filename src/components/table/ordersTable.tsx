"use client";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
} from "@/redux/api/orderApi";
import { getUserInfo } from "@/services/auth.service";
import { IOrder } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImPencil, ImBin } from "react-icons/im";
import { toast } from "react-toastify";
import ProcessingBtn from "../loading/ProcessingBtn";

const OrdersTable = ({ searchTerm }: { searchTerm: string }) => {
  const query: Record<string, any> = {};
  const [currentPage, setCurrentPage] = useState(1);
  const [userId, setUserId] = useState("");

  const [userRole, setUserRole] = useState("");
  const { _id, role } = getUserInfo() as any;

  useEffect(() => {
    if (role === "user") {
      setUserId(_id);
    }
  }, [userId]);

  if (userId) query["userId"] = userId;
  if (searchTerm) query["searchTerm"] = searchTerm;
  query["page"] = currentPage.toString();
  const { data, isLoading } = useGetOrdersQuery({ ...query });
  const orders: IOrder[] = data?.orders;
  const meta = data?.meta;
  console.log(meta);
  const [deleteOrder] = useDeleteOrderMutation();

  useEffect(() => {
    setUserRole(role);
  }, [userRole]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-fit">
          <ProcessingBtn />
        </div>
      </div>
    );
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(meta?.total / meta?.limit)) {
      setCurrentPage(currentPage + 1);
    }
  };

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
                  {order?.shippingAddress?.address},
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
                      <Link href={`/dashboard/${role}/orders/${order?._id}`}>
                        {" "}
                        <ImPencil
                          className="text-blue-400 cursor-pointer"
                          size={28}
                        />
                      </Link>
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
      </table>{" "}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          className={`px-4 py-2 bg-sky-400 text-white rounded ${
            currentPage === 1 && "cursor-not-allowed opacity-50"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(meta?.total / meta?.limit)}
        </span>
        <button
          onClick={handleNext}
          className={`px-4 py-2 bg-sky-400 text-white rounded ${
            currentPage === Math.ceil(meta?.total / meta?.limit) &&
            "cursor-not-allowed opacity-50"
          }`}
          disabled={currentPage === Math.ceil(meta?.total / meta?.limit)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersTable;
