import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "global/interfaces";
import { baseUrl, fetchWithBQ } from "./helpers";

export const translationsApi = createApi({
  reducerPath: "translationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/translations` }),
  tagTypes: ["authenticated", "translations"],
  endpoints: (rtk) => ({
    createUser: rtk.mutation({
      query: (newUser: User) => ({
        url: "/",
        method: "POST",
        body: newUser,
        headers: {
          "X-API-Key": "98osduf98sdlkfj342sdlkfj",
          "Content-Type": "application/json",
        },
      }),

      // invalidatesTags: [{ type: "authenticated" }],
    }),

    getUserById: rtk.query({
      query: (userId: number) => `/?id=${userId}`,
    }),

    getUserByUsername: rtk.query({
      query: (username: string) => `/?username=${username}`,
      transformResponse: ([result]: User[]) => {
        return result;
      },
    }),

    getAllUsers: rtk.query({
      query: () => `/`,
    }),

    // >>> Translations >>>
    // >>>>>>>>>>>>>>>>>>>>
    //

    getTranslations: rtk.query<string[], number>({
      query: (userId: number) => `/?id=${userId}`,
      transformResponse: ([result]: User[], bla, bll) => {
        const { translations } = result;
        return translations;
      },

      providesTags: [{ type: "translations" }],
    }),

    clearTranslations: rtk.mutation({
      query: (userId) => ({
        url: `/${userId}`,
        method: "PATCH",
        body: {
          translations: [],
        },
        headers: {
          "X-API-Key": "98osduf98sdlkfj342sdlkfj",
          "Content-Type": "application/json",
        },
      }),

      invalidatesTags: [{ type: "translations" }],
    }),

    setTranslations: rtk.mutation({
      async queryFn({ userId, text }: { userId: number; text: string }) {
        // $ - Fetch translations history and unshift new addition. Keep entries capped at 10 translations.
        const [fetchedUser]: User[] = await fetchWithBQ(`?id=${userId}`);
        if (!fetchedUser) return { error: "blabla" };

        const { translations: prevTranslations } = fetchedUser;

        if (prevTranslations.length > 9) {
          prevTranslations.pop();
        }
        prevTranslations.unshift(text);

        const newTranslations = prevTranslations;

        // $ - Replace translations history with new addition.
        return await fetchWithBQ(`/${userId}`, {
          method: "PATCH",
          body: JSON.stringify({
            translations: newTranslations,
          }),
        }).then((res) =>
          res.data ? { data: res.data } : { error: res.error }
        );
      },

      invalidatesTags: [{ type: "translations" }],
    }),
  }),
});

export const {
  useLazyGetUserByUsernameQuery,
  useLazyGetAllUsersQuery,
  useLazyGetUserByIdQuery,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useCreateUserMutation,
  useClearTranslationsMutation,
  useGetTranslationsQuery,
  useSetTranslationsMutation,
} = translationsApi;
