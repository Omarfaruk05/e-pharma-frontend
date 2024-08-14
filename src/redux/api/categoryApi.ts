import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const CATEGORY_URL = "/category";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addCategory: build.mutation({
      query: (data) => ({
        url: CATEGORY_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    getCategories: build.query({
      query: () => ({
        url: CATEGORY_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),
    getSingleCategory: build.query({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),
    updateCategory: build.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
