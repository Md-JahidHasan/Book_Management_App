import { Button } from "@/components/ui/button";
import { useGetBooksQuery } from "@/redux/features/book/bookApi";
import { useNavigate } from "react-router-dom";
import AddBook from "./AddBook";

export default function BookList() {
    const { data: books, isLoading, error } = useGetBooksQuery(undefined);
    console.log(books, isLoading, error);
    
  const navigate = useNavigate();

  if (isLoading)
    return <div className="text-center mt-10">Loading books...</div>;
  if (error) return <div className="text-red-500">Failed to load books.</div>;
    
    if (books)
        return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Books</h2>
                    <Button onClick={() => navigate("/create-book")}>Add New Book</Button>
                    <AddBook></AddBook>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
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
                <td className="p-2">{book.title}</td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
