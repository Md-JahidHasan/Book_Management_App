import { cn } from "@/lib/utils";
import { useGetBookQuery } from "@/redux/features/book/bookApi";
import { useParams } from "react-router-dom";

const ViewBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, error } = useGetBookQuery(id);

  if (isLoading) return <div className="p-4">Loading book details...</div>;
  if (error)
    return (
      <div className="p-4 text-red-500">
        Failed to load book. Please try again later.
      </div>
    );
  if (!book) return <div className="p-4 text-red-500">Book not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF2DF] via-[#FFE0B2] to-[#D3A376] flex items-center justify-center py-12 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-3xl w-full border border-[#8C6E63]">
        <h1 className="text-4xl font-extrabold text-[#3E2522] mb-8 border-b border-[#D3A376] pb-4">
          Book Details
        </h1>
        <div className="space-y-4 text-[#3E2522] text-lg">
          <p>
            <span className="font-semibold">Title:</span> {book.data.title}
          </p>
          <p>
            <span className="font-semibold">Author:</span> {book.data.author}
          </p>
          <p>
            <span className="font-semibold">Genre:</span> {book.data.genre}
          </p>
          <p>
            <span className="font-semibold">ISBN:</span> {book.data.isbn}
          </p>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {book.data.description}
          </p>
          <p>
            <span className="font-semibold ">Copies:</span>{" "}
            {book.data.copies}
          </p>
          <p
            className={cn(
              "font-semibold",
              book.data.available ? "text-green-600" : "text-red-600"
            )}
          >
            Available: {book.data.available ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
