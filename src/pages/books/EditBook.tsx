import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBookQuery,
  useUpdateBookMutation,
} from "../../redux/features/book/bookApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

const EditBook = () => {
  const { id } = useParams();
  const { data: book, isLoading } = useGetBookQuery(id!);
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
    await updateBook({
      id: id!,
      data: { ...formData, available: formData.copies > 0 },
    });
    toast("Data updated successfully!", {
      duration: 2000,
      position: "top-center",
      style: {
        marginTop: "30%",
        background: "green",
        color: "white",
      },
    });

    navigate("/books");
  };

  if (isLoading) return <div>Loading...</div>;
  if (!book) return <div>Book not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF2DF] via-[#FFE0B2] to-[#D3A376] py-22 px-4 md:px-10">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-xl p-10 grid md:grid-cols-2 gap-10 border border-[#8C6E63]">
        <div>
          <h2 className="text-3xl font-extrabold text-[#3E2522] mb-6 border-b pb-2 border-[#D3A376]">
            Previous Book Info
          </h2>
          <div className="text-[#3E2522] space-y-3 text-sm">
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
              <strong>Copies:</strong> {book.data.copies}
            </p>
            <p>
              <strong>Description:</strong> {book.data.description}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-3xl font-extrabold text-[#3E2522] mb-6 border-b pb-2 border-[#D3A376]">
            Update Book Info
          </h2>

          {[
            { label: "Title (title)", name: "title", type: "text" },
            { label: "Author (author)", name: "author", type: "text" },
            { label: "Genre (genre)", name: "genre", type: "text" },
            { label: "ISBN (isbn)", name: "isbn", type: "text" },
            { label: "Copies (copies)", name: "copies", type: "number" },
          ].map((field) => (
            <div className="space-y-1" key={field.name}>
              <label className="block text-sm font-medium text-[#3E2522]">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                placeholder={field.label.split(" (")[0]}
                className="w-full px-4 py-2 rounded-lg border border-[#8C6E63] bg-[#FFF2DF] focus:outline-none focus:ring-2 focus:ring-[#D3A376]"
              />
            </div>
          ))}

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#3E2522]">
              Description (description)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full px-4 py-2 rounded-lg border border-[#8C6E63] bg-[#FFF2DF] focus:outline-none focus:ring-2 focus:ring-[#D3A376]"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#3E2522] text-[#FFE0B2] hover:bg-[#8C6E63] py-2 px-4 rounded-lg font-semibold shadow-md transition duration-300"
          >
            Update Book
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
