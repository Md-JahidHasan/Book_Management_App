// --- File: src/components/HeroCarousel.tsx ---
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useGetBooksQuery } from "@/redux/features/book/bookApi";
import type { IBook } from "@/types/types";

export default function HeroCarousel() {
  const { data: booksData } = useGetBooksQuery(undefined);
  const books = booksData?.data?.slice(0, 5) || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === books.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [books.length]);

  if (!books.length) return null;

  return (
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
      <div className="relative h-[400px] w-full overflow-hidden rounded-lg shadow-xl">
        {books.map((book:IBook, idx: any) => (
          <div
            key={book._id}
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center text-white transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="bg-black/50 p-6 rounded-xl text-center max-w-xl">
              <h3 className="text-4xl font-bold text-[#FFE0B2]">
                {book.title}
              </h3>
              <p className="text-lg text-[#FFF2DF] mt-2 mb-4">{book.author}</p>
              <Link
                to={`/books/${book._id}`}
                className="inline-block px-6 py-3 bg-[#D3A376] text-[#3E2522] font-semibold rounded-xl shadow-md hover:bg-[#FFE0B2] transition duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
