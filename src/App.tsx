import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./features/dashboard/Dashboard";
import Background from "./ui/Background";
import SignIn from "./features/auth/SignIn";
import SignUp from "./features/auth/SignUp";

const router = createBrowserRouter([
  {
    path: "auth",
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "",
        element: <Navigate to="sign-in" />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "",
    element: <Navigate to="auth" />,
  },
]);

export default function App() {
  return (
    <section className="h-screen w-screen">
      <Background />
      <RouterProvider router={router} />
    </section>
  );
}
