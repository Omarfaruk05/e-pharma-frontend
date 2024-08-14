import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const SHIPPING_ADDRESS_URL = "/shippingAddress";

export const shippingAddressApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addShippingAddress: build.mutation({
      query: (data) => ({
        url: SHIPPING_ADDRESS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.shippingAddress],
    }),
    getShippingAddresses: build.query({
      query: () => ({
        url: SHIPPING_ADDRESS_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.shippingAddress],
    }),
    getSingleShippingAddress: build.query({
      query: (id) => ({
        url: `${SHIPPING_ADDRESS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.shippingAddress],
    }),
    updateShippingAddress: build.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `${SHIPPING_ADDRESS_URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.shippingAddress],
    }),
    deleteShippingAddress: build.mutation({
      query: (id) => ({
        url: `${SHIPPING_ADDRESS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.shippingAddress],
    }),
  }),
});

export const {
  useAddShippingAddressMutation,
  useGetShippingAddressesQuery,
  useGetSingleShippingAddressQuery,
  useUpdateShippingAddressMutation,
  useDeleteShippingAddressMutation,
} = shippingAddressApi;
