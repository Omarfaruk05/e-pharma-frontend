import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const PRODUCT_URL = "/products";

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addProduct: build.mutation({
      query: (data) => ({
        url: PRODUCT_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    getProducts: build.query({
      query: () => ({
        url: PRODUCT_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),
    getSingleProduct: build.query({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),
    updateProduct: build.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
