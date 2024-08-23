import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import AppLayout from "./layouts/AppLayout";
import BlogEditor from "./components/BlogEditor";
import GetBlog from "./components/GetBlog";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider } from "./context";
import Profile from "./components/Profile";

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
        element: (
          <RequireAuth>
            <BlogEditor />
          </RequireAuth>
        ),
      },
      {
        path: "/:id",
        element: <GetBlog />,
      },
      {
        path: "/profile",
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
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
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
]);
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
