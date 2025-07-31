import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster
      ></Toaster>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
