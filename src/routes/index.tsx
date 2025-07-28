import App from "@/App";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([{
    path: '/',
    element: <App></App>,
    children:[]
}])


export default router;