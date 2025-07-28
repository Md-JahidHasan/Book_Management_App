import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../../redux/features/book/bookApi";

const ViewBook = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBookQuery(id!);

    const book = data.data;
    console.log(book);
    
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Book Details</h2>
      {book && (
        <div className="space-y-2">
          <p>
            <strong>Title:</strong> {book.title}
          </p>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Genre:</strong> {book.genre}
          </p>
          <p>
            <strong>ISBN:</strong> {book.isbn}
          </p>
          <p>
            <strong>Description:</strong> {book.description}
          </p>
          <p>
            <strong>Copies:</strong> {book.copies}
          </p>
          <p>
            <strong>Available:</strong> {book.available ? "Yes" : "No"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewBook;
