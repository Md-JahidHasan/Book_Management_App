import App from "@/App";
import BookList from "@/pages/books/BookList";
import ViewBook from "@/pages/books/ViewBook";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([{
    path: '/',
    element: <App></App>,
    children: [
        {
            index: true,
            element: <BookList></BookList>
        },
        {
            path: '/books/:id',
            element: <ViewBook></ViewBook>
        }
    ]
}])


export default router;