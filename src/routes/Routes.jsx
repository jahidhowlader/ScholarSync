
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import AddCourse from "../pages/dashboard/addCourse/AddCourse";
import AppliedListClient from "../pages/dashboard/appliedListClient/AppliedListClient";
import AppliedListAdmin from "../pages/dashboard/appliedListAdmin/AppliedListAdmin";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import UserExistRoute from "./UserExistRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <UserExistRoute><Login /></UserExistRoute>
            },
            {
                path: '/register',
                element: <UserExistRoute><Register /></UserExistRoute>
            },
            {
                path: '/appliedListClient',
                element: <PrivateRoutes><AppliedListClient /></PrivateRoutes>
            },
            {
                path: '/addCourse',
                element: <AdminRoutes><AddCourse /></AdminRoutes>
            },
            {
                path: '/appliedListAdmin',
                element: <AdminRoutes><AppliedListAdmin /></AdminRoutes>
            }
        ]
    }
])