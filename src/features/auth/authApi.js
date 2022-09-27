import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login
    loggedIn: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          // store localStorage for save reload information loggedIn user
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data?.accessToken,
              user: result?.data?.user,
            })
          );

          //store redux store the user information
          dispatch(
            userLoggedIn({
              accessToken: result.data?.accessToken,
              user: result?.data?.user,
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoggedInMutation } = authApi;
