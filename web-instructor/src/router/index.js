import { createBrowserRouter } from "react-router-dom";
import Template from "../components/Template";
import Dashboard from "../views/Dashboard";
import Grading from "../views/Grading";
import Schedule from "../views/Schedule";
import Student from "../views/Student";

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
        path: "/grading",
        element: <Grading />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
    ],
  },
]);

export default router;
