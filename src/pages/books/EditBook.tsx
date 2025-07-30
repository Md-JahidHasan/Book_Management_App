import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBookQuery,
  useUpdateBookMutation,
} from "../../redux/features/book/bookApi";
import { useEffect, useState } from "react";

const EditBook = () => {
  const { id } = useParams();
    const { data: book, isLoading } = useGetBookQuery(id!);
    // console.log(book);
    
  const [updateBook] = useUpdateBookMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 0,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.data.title ?? "",
        author: book.data.author ?? "",
        genre: book.data.genre ?? "",
        isbn: book.data.isbn ?? "",
        description: book.data.description ?? "",
        copies: book.data.copies ?? 0,
      });
    }
  }, [book]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "copies" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      id: id!,
      data: { ...formData, available: formData.copies > 0 },
    });
    
    await updateBook({
      id: id!,
      data: { ...formData, available: formData.copies > 0 },
    });
    navigate("/books");
  };

  if (isLoading) return <div>Loading...</div>;
  if (!book) return <div>Book not found.</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-1/2">
          <div>
            <label htmlFor="">Pr3vious data</label>
            <input
              name="title"
              disabled={true}
              value={formData.title}
            //   onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Title"
            />
          </div>
          <input
            name="title"
            value='Enter new title'
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Title"
          />
        </div>
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Author"
        />
        <input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Genre"
        />
        <input
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="ISBN"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Description"
        />
        <input
          name="copies"
          type="number"
          value={formData.copies}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Copies"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;
