import { IMeta, IOrder } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const ORDER_URL = "/order";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addOrder: build.mutation({
      query: (data) => ({
        url: ORDER_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.order],
    }),
    getOrders: build.query({
      query: (arg: Record<string, any>) => ({
        url: ORDER_URL,
        method: "GET",
        arg,
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          orders: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: [tagTypes.order],
    }),
    getSingleOrder: build.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),
    updateOrder: build.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `${ORDER_URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.order],
    }),
    deleteOrder: build.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
