import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="flex gap-6">
        <Link to="/books">All Books</Link>
        <Link to="/create-book">Add Book</Link>
        <Link to="/borrow-summary">Borrow Summary</Link>
      </div>
    </nav>
  );
};

export default Navbar;
