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
    }),

    // POST add book
      addBook: builder.mutation({
          query: (bookData) => ({
              url: "/books",
              method: "POST",
              body: bookData
        })
      }),

    //   Get a book by id
      getBook: builder.query({
          query: (id)=>`/books/${id}`
      }),

      //   Update a book
      updateBook: builder.mutation({
          query: ({ id, data }) => ({
              url: `/books/${id}`,
              method: 'PATCH',
              body: data
          })
      })
  }),
});


export const {useGetBooksQuery, useAddBookMutation} = bookApi;