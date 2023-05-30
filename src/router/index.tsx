import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup";
import Main from "../pages/Main";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Signup />,
    },
    {
        path: "/main",
        element: <Main />,
    },
]);

export default router;