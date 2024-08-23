import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import AppLayout from "./layouts/AppLayout";
import BlogEditor from "./components/BlogEditor";
import GetBlog from "./components/GetBlog";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create",
        element: <BlogEditor />,
      },
      {
        path: "/:id",
        element: <GetBlog />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
      },
    ],
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
