import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "api";
import { User } from "global/interfaces";

const fetchWithBQ = async (url: string, ...options: any) => {
  return fetch(`${baseUrl}/translations${url}`, ...options)
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
      transformResponse: ({ username }: User, bla, bla2) => {
        return username;
      },

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

    getUserByToken: rtk.query({
      query: (token: string) => `/?token=${token}`,
      transformResponse: (res) => {
        console.log(res);
        return res;
      },
      transformErrorResponse: (err) => {
        return err;
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

        const res = await fetchWithBQ(`/${id}`, {
          method: "PATCH",
          body: JSON.stringify({
            translations: newTranslations,
          }),
          headers: {
            "X-API-Key": "98osduf98sdlkfj342sdlkfj",
            "Content-Type": "application/json",
          },
        });

        console.log(await res);

        return res.data ? { data: res.data } : { error: res.error };
      },
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
