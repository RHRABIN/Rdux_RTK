import { apiSlice } from "../api/apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
  tagTypes: ["backlog"],
  endpoints: (builder) => ({
    //get single user by email
    getSingleUser: builder.query({
      query: (email) => ({
        url: `/users?email=${email}`,
        method: "GET",
      }),
    }),

    //get all backlog projects
    getBackLogProjects: builder.query({
      query: () => ({
        url: "/backlog",
        method: "GET",
      }),
      providesTags: ["backlog"],
    }),

    //add a backlog projects
    addBackLogProject: builder.mutation({
      query: (data) => ({
        url: "/backlog",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["backlog"],
    }),
    // delete backlog
    deleteBacklogById: builder.mutation({
      query: (id) => ({
        url: `/backlog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["backlog"],
    }),

    //end
  }),
});

export const {
  useGetBackLogProjectsQuery,
  useAddBackLogProjectMutation,
  useGetSingleUserQuery,
  useDeleteBacklogByIdMutation,
} = projectsApi;
