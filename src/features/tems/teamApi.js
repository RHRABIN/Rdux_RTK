import { apiSlice } from "../api/apiSlice";

export const teamApi = apiSlice.injectEndpoints({
  tagTypes: ["Teams", "Members"],
  endpoints: (builder) => ({
    //endpoints here
    getTeam: builder.query({
      query: () => ({
        url: "/teams",
        method: "GET",
      }),
      providesTags: ["Teams"],
    }),

    //get user without loggedin user and already member
    getUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    // get single member who added on team_members
    getSingleMemberByEmail: builder.query({
      query: (id) => ({
        url: `/team_members?cardId=${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Members", "Teams"],
    }),

    // add member
    addMember: builder.mutation({
      query: (data) => ({
        url: "/team_members",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Teams", "Members"],
    }),

    //get member
    getMember: builder.query({
      query: (id) => ({
        url: `/team_members?cardId=${id}`,
        method: "GET",
      }),
      providesTags: ["Members"],
      invalidatesTags: ["Teams", "Members"],
    }),

    // add team
    addTeam: builder.mutation({
      query: (data) => ({
        url: "/teams",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Teams", "Members"],
    }),

    //delete team
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teams"],
    }),
  }),
});

export const {
  useAddTeamMutation,
  useGetTeamQuery,
  useGetUserQuery,
  useAddMemberMutation,
  useGetMemberQuery,
  useDeleteTeamMutation,
  useGetSingleMemberByEmailQuery,
} = teamApi;
