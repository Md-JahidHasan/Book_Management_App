import { Button } from "@/components/ui/button";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/redux/features/book/bookApi";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import { Pencil, Trash2, Plus, BadgeAlert } from "lucide-react";
import BorrowBook from "@/components/dialogue/BorrowBook";
import Loading from "@/components/loading/Loading";
import { useState } from "react";
import { cn } from "@/lib/utils";
import AddBook from "./AddBook";
import AddBook2 from "./AddBook2";
import toast from "react-hot-toast";

export default function BookList() {
  const { data: books, isLoading, error } = useGetBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500">Failed to load books.</div>;

  // Filter logic
  const filteredBooks = books?.data?.filter((book) => {
    const term = search.toLowerCase();
    return (
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.genre.toLowerCase().includes(term)
    );
  });

  return (
    <div
      className="min-h-screen w-full relative pt-12"
      style={{
        background: "linear-gradient(135deg, #FFF2DF, #FFE0B2, #D3A376)",
      }}
    >
      <div className="max-w-7xl mx-auto p-6">
        {/* Search/filter input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by title, author, or genre..."
            className="w-full px-4 py-3 rounded-xl border border-[#D3A376] shadow focus:outline-none focus:ring-2 focus:ring-[#D3A376]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Hero Section - Carousel */}
        <div
          className="rounded-xl overflow-hidden p-4 mb-10 relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1470&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            minHeight: "420px",
          }}
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            speed={1000}
            className="rounded-lg overflow-hidden shadow-xl"
            style={{ height: "400px" }}
          >
            {books.data.slice(0, 5).map((book) => (
              <SwiperSlide key={book._id}>
                <div className="relative h-full flex items-center justify-center">
                  <img
                    src={
                      book.image ||
                      `https://source.unsplash.com/1200x600/?books,${encodeURIComponent(
                        book.title
                      )}`
                    }
                    alt={book.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-xl brightness-[0.4]"
                  />
                  <div className="relative z-10 text-center text-white max-w-xl px-6">
                    <h3 className="text-4xl font-bold text-[#FFE0B2] drop-shadow-lg">
                      {book.title}
                    </h3>
                    <p className="text-lg text-[#FFF2DF] mt-2 mb-4 drop-shadow">
                      {book.author}
                    </p>
                    <Link
                      to={`/books/${book._id}`}
                      className="inline-block px-6 py-3 bg-[#D3A376] text-[#3E2522] font-semibold rounded-xl shadow-md hover:bg-[#FFE0B2] transition duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Book Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks?.map((book) => {
            // const isNew = books.data
            //   .slice(0, 5)
            //   .some((b) => b._id === book._id);
            return (
              <div
                key={book._id}
                className="bg-[#FFF2DF] shadow-md rounded-2xl p-5 flex flex-col gap-3 border border-[#FFE0B2] hover:shadow-lg transition duration-300 relative"
              >
                {/* Badges */}
                {!book.available && (
                  <span className="absolute top-3 right-3 bg-red-400 text-white text-xs font-semibold px-2 py-2 rounded-2xl flex items-center gap-1">
                    <BadgeAlert className="w-3 h-3" />
                    Unavailable
                  </span>
                )}

                <div className="text-xl font-semibold text-[#3E2522] py-2">
                  {book.available ? (
                    book.title
                  ) : (
                    <span className="line-through">{book.title}</span>
                  )}
                </div>
                <div className="text-sm text-[#8C6E63]">
                  Author: {book.author}
                </div>
                <div className="text-sm text-[#8C6E63]">
                  Genre: {book.genre}
                </div>
                <div className="text-sm text-[#8C6E63]">ISBN: {book.isbn}</div>
                <div className="text-sm text-[#8C6E63]">
                  Copies: {book.copies}
                </div>
                <div className="text-sm text-[#8C6E63]">
                  Available:{" "}
                  <span className="font-medium">
                    {book.available ? "Yes" : "No"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-3">
                  <Button
                    variant="outline"
                    className="col-span-3 text-[#3E2522] border-[#D3A376] hover:bg-[#FFE0B2] text-sm px-3"
                    onClick={() => navigate(`/books/${book._id}`)}
                  >
                    View Details
                  </Button>
                  <button
                    onClick={() => navigate(`/edit-book/${book._id}`)}
                    className="flex items-center justify-center bg-[#D3A376] text-white rounded-lg p-2 hover:bg-[#8C6E63] transition"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  {book.available ? <button
                    className={cn("flex justify-center ")}
                  >
                    <BorrowBook bookId={book._id} />
                  </button> : 
                    <span className=" bg-red-400 text-white text-xs font-semibold px-2 py-2 rounded-md m-auto gap-1">
                      Stock Out
                    </span>
                  }
                  
                  <button
                            onClick={() => {
                                deleteBook(book._id!);
                                toast("Data updated successfully!", {
                                  duration: 2000,
                                  position: "top-center",
                                  style: {
                                    marginTop: "30%",
                                    background: "green",
                                    color: "white",
                                  },
                                });
                    }}
                    className="flex items-center justify-end text-red-500 hover:text-red-600 rounded-lg w-4  transition "
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Add Book Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-[#D3A376] text-white hover:bg-[#8C6E63] shadow-xl p-4 rounded-full transition duration-300 flex items-center justify-center"
        title="Add Book"
      >
        <AddBook2></AddBook2>
      </button>
    </div>
  );
}
