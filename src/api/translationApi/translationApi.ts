import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "api";
import { User } from "global/interfaces";

const fetchWithBQ = async (url: string, options?: any) => {
  return fetch(`${baseUrl}/translations${url}`, {
    headers: {
      "X-API-Key": "98osduf98sdlkfj342sdlkfj",
      "Content-Type": "application/json",
    },
    ...options,
  })
    .then((res) => {
      if (!res.ok) {
        console.log(res);
      }
      return res.json();
    })
    .then((data) => data);
};

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
      // transformResponse: ({ username }: User) => {
      //   return username;
      // },

      invalidatesTags: [{ type: "authenticated" }],
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
      transformResponse: ([result]: User[]) => {
        const { translations } = result;
        return translations;
      },

      providesTags: [{ type: "translations" }],
    }),

    setTranslations: rtk.mutation({
      async queryFn({ id, text }: { id: number; text: string }) {
        const [fetchedUser]: User[] = await fetchWithBQ(`?id=${id}`);
        if (!fetchedUser) return { error: "blabla" };

        const { translations: prevTranslations } = fetchedUser;

        if (prevTranslations.length > 9) {
          prevTranslations.pop();
        }
        prevTranslations.unshift(text);

        const newTranslations = prevTranslations;

        return await fetchWithBQ(`/${id}`, {
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
  useGetTranslationsQuery,
  useSetTranslationsMutation,
} = translationsApi;
