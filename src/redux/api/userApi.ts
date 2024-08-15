import { IMeta } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const USER_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addUser: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/create-user`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    verifyOTP: build.mutation({
      query: (data) => ({
        url: `/otp/verifyOTP`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.otp],
    }),
    login: build.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    getUsers: build.query({
      query: (arg: Record<string, any>) => ({
        url: USER_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          users: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: [tagTypes.user],
    }),
    getSingleUser: build.query({
      query: (id: any) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateMyProfile: build.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `${USER_URL}/${id}`,
        method: "PATCH",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useAddUserMutation,
  useVerifyOTPMutation,
  useLoginMutation,
  useGetSingleUserQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateMyProfileMutation,
} = userApi;
