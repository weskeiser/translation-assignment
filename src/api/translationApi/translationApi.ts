import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "api";
import { User } from "global/interfaces";

export const translationsApi = createApi({
  reducerPath: "translationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/translations` }),
  tagTypes: ["Authenticated", "Translations"],
  endpoints: (rtk) => ({
    // >>> Users >>>
    // >>>>>>>>>>>>>

    createUser: rtk.mutation({
      query: (newUser: User) => ({
        url: "/",
        method: "POST",
        headers: {
          "X-API-Key": "98osduf98sdlkfj342sdlkfj",
          "Content-Type": "application/json",
        },
        body: newUser,
      }),
      transformResponse: ({ username }: User) => {
        return username;
      },

      invalidatesTags: [{ type: "Authenticated" }],
    }),

    //

    getUserById: rtk.query({
      query: (userId: number) => `/?id=${userId}`,
    }),

    //

    getUserByUsername: rtk.query({
      query: (username: string) => `/?username=${username}`,
      transformResponse: ([result]: User[]) => {
        return result;
      },
    }),

    //

    getUserByToken: rtk.query({
      query: (token: string) => `/?token=${token}`,
    }),

    //

    getAllUsers: rtk.query({
      query: () => `/`,
    }),

    // >>> Translations >>>
    // >>>>>>>>>>>>>>>>>>>>
    //

    getTranslations: rtk.query({
      query: (userId: number) => `/?id=${userId}`,
      transformResponse: ([result]: User[]) => {
        const { translations } = result;
        return translations;
      },

      providesTags: [{ type: "Translations" }],
    }),

    //

    setTranslations: rtk.mutation({
      query: ({ id, ...translations }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: translations,
      }),

      invalidatesTags: [{ type: "Translations" }],
    }),
  }),
});

export const {
  useLazyGetUserByUsernameQuery,
  useLazyGetAllUsersQuery,
  useLazyGetUserByTokenQuery,
  useGetUserByTokenQuery,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useCreateUserMutation,
  useGetTranslationsQuery,
  useSetTranslationsMutation,
} = translationsApi;
