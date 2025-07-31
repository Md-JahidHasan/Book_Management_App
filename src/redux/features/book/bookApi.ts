import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  tagTypes: ["Books", "Borrow"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-api-navy.vercel.app/api",
  }),
  endpoints: (builder) => ({
    //  GET all books
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["Books"],
    }),

    // POST add book
    addBook: builder.mutation({
      query: (bookData) => ({
        url: "/books/create-book",
        method: "POST",
        body: bookData,
        }),
        invalidatesTags:['Books']
    }),

    //   Get a book by id
    getBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Books", id }],
    }),

    //   Update a book
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    // Delete Book
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),

      // Borrow Book Page
      borrowBook: builder.mutation({
          query: (data) => ({
              url: `/borrow`,
              method: "POST",
              body: data
          }),
          invalidatesTags: ["Books", "Borrow"]
      }),
      //   Get Borrow Summary
      getBorrowSummary: builder.query({
          query: () => "/borrow",
          providesTags:["Borrow"]
      })
  }),
});


export const {useGetBooksQuery, useAddBookMutation, useGetBookQuery, useUpdateBookMutation, useDeleteBookMutation, useBorrowBookMutation, useGetBorrowSummaryQuery} = bookApi;