// app/services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Adjust to your API URL
  tagTypes: ['Posts', 'Users'], // Add tag types for cache invalidation
  endpoints: (builder) => ({
    // Define your endpoints here
    getPosts: builder.query({
      query: () => 'posts',
      providesTags: ['Posts'],
    }),
    getPostById: builder.query({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    addPost: builder.mutation({
      query: (post) => ({
        url: 'posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Posts'],
    }),
    // Add more endpoints as needed
  }),
});

// Export hooks for usage in components
export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddPostMutation,
} = api;