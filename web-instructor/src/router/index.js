import { createBrowserRouter } from "react-router-dom";
import Template from "../components/Template";
import Dashboard from "../views/Dashboard";
import Assignment from "../views/Assignment";
import Schedule from "../views/Schedule";
import Student from "../views/Student";
import Login from "../views/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "/student",
        element: <Student />,
      },
      {
        path: "/assignment",
        element: <Assignment />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
