import { Button } from "@/components/ui/button";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/features/book/bookApi";
import { Link, useNavigate } from "react-router-dom";
import AddBook from "./AddBook";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import BorrowBook from "@/components/dialogue/BorrowBook";

export default function BookList() {
    const { data: books, isLoading, error } = useGetBooksQuery(undefined);
    const [deleteBook] = useDeleteBookMutation()
    // console.log(books, isLoading, error);
    
  const navigate = useNavigate();

  if (isLoading)
    return <div className="text-center mt-10">Loading books...</div>;
  if (error) return <div className="text-red-500">Failed to load books.</div>;
    
    if (books)
        return (
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Books</h2>
              <AddBook></AddBook>
            </div>

            <div className="overflow-x-auto">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="rounded-lg overflow-hidden"
              >
                {books.data.slice(0, 5).map((book) => (
                  <SwiperSlide key={book._id}>
                    <div className="relative h-60">
                      <img
                        src={
                          book.image ||
                          `https://source.unsplash.com/800x400/?book,${book.title}`
                        }
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center p-4">
                        <h3 className={cn("text-2xl font-bold")}>
                          {book.title}
                        </h3>
                        <p className="text-sm">{book.author}</p>
                        <Link
                          to={`/books/${book._id}`}
                          className="mt-2 text-blue-200 underline"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <table className="min-w-full bg-white rounded shadow mt-4">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2">Title</th>
                    <th className="p-2">Author</th>
                    <th className="p-2">Genre</th>
                    <th className="p-2">ISBN</th>
                    <th className="p-2">Copies</th>
                    <th className="p-2">Available</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.data?.map((book) => (
                    <tr key={book._id} className="border-t">
                      <td
                        className={cn("p-2", {
                          "line-through": !book.available,
                        })}
                      >
                        {book.title}
                      </td>
                      <td className="p-2">{book.author}</td>
                      <td className="p-2">{book.genre}</td>
                      <td className="p-2">{book.isbn}</td>
                      <td className="p-2">{book.copies}</td>
                      <td className="p-2">{book.available ? "Yes" : "No"}</td>
                      <td className="p-2 flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/books/${book._id}`)}
                        >
                          View
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => navigate(`/edit-book/${book._id}`)}
                        >
                          Edit
                        </Button>
                              {/* You can add delete or borrow here */}
                              <BorrowBook bookId={book._id}></BorrowBook>
                        <button
                          onClick={() => deleteBook(book._id!)}
                          className="text-red-500 hover:underline"
                        >
                          <Trash2></Trash2>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
}
