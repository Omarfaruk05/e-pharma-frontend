import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const VARIANT_URL = "/variants";

export const variantApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addVariant: build.mutation({
      query: (data) => ({
        url: VARIANT_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.variant],
    }),
    getVariants: build.query({
      query: () => ({
        url: VARIANT_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.variant],
    }),
    getSingleVariant: build.query({
      query: (id) => ({
        url: `${VARIANT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.variant],
    }),
    updateVariant: build.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `${VARIANT_URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.variant],
    }),
    deleteVariant: build.mutation({
      query: (id) => ({
        url: `${VARIANT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.variant],
    }),
  }),
});

export const {
  useAddVariantMutation,
  useGetVariantsQuery,
  useGetSingleVariantQuery,
  useUpdateVariantMutation,
  useDeleteVariantMutation,
} = variantApi;
