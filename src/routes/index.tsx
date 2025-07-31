import App from "@/App";
import BookList from "@/pages/books/BookList";
import EditBook from "@/pages/books/EditBook";
import ViewBook from "@/pages/books/ViewBook";
import BorrowSummary from "@/pages/borrow/BorrowSummary";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([{
    path: '/',
    element: <App></App>,
    children: [
        {
            path:'/',
            element: <BookList></BookList>
        },
        {
            path: '/books',
            element:<BookList></BookList>
        },
        {
            path: '/books/:id',
            element: <ViewBook></ViewBook>
        },
        {
            path: '/edit-book/:id',
            element:<EditBook></EditBook>
        },
        {
            path: '/borrow-summary',
            element: <BorrowSummary></BorrowSummary>
        }
    ]
}])


export default router;