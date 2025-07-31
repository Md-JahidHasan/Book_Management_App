import { Link } from "react-router-dom";
import { BookOpen, PlusCircle, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import AddBook from "@/pages/books/AddBook";
// import AddBook from "@/pages/AddBook";

const Navbar = () => {
  return (
    <nav className="bg-[#3E2522] text-white shadow-md fixed w-full top-0 z-50 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="https://img.icons8.com/ios-filled/50/ffffff/book.png"
              alt="Logo"
              className="w-6 h-6"
            />
            <span className="font-semibold text-lg tracking-wide text-[#FFE0B2] hidden sm:block">
              MyLibrary
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4 items-center">
            <Link
              to="/books"
              className="flex items-center space-x-2 hover:text-[#FFE0B2] transition-colors duration-200"
            >
              <BookOpen className="w-5 h-5" />
              <span className="hidden sm:inline">All Books</span>
            </Link>

            {/* Add Book Modal Trigger */}
            <AddBook></AddBook>

            <Link
              to="/borrow-summary"
              className="flex items-center space-x-2 hover:text-[#FFE0B2] transition-colors duration-200"
            >
              <ClipboardList className="w-5 h-5" />
              <span className="hidden sm:inline">Borrow Summary</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
