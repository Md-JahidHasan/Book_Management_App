import { cn } from "@/lib/utils";
import { useGetBookQuery } from "@/redux/features/book/bookApi";
import { useParams } from "react-router-dom";


const ViewBook = () => {
  const { id } = useParams();

//   if (!id) {
//     return <div className="p-4 text-red-500">Invalid book ID.</div>;
//   }

    const { data:book, isLoading, error } = useGetBookQuery(id);
    

  if (isLoading) return <div className="p-4">Loading book details...</div>;
  if (error)
    return (
      <div className="p-4 text-red-500">
        Failed to load book. Please try again later.
      </div>
    );
  if (!book) return <div className="p-4 text-red-500">Book not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Details</h1>
      <div className="space-y-2">
        <p>
          <strong>Title:</strong> {book.data.title}
        </p>
        <p>
          <strong>Author:</strong> {book.data.author}
        </p>
        <p>
          <strong>Genre:</strong> {book.data.genre}
        </p>
        <p>
          <strong>ISBN:</strong> {book.data.isbn}
        </p>
        <p>
          <strong>Description:</strong> {book.data.description}
        </p>
        <p className="text-red-400">
          <strong className="text-red-400">Copies:</strong> {book.data.copies}
        </p>
        <p className={cn({ "text-red-500 font-bold": book.data.available })}>
          <strong>Available:</strong> {book.data.available ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};

export default ViewBook;
