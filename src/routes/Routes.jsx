
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Users from "../pages/Users";

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
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/applyList',
                element: ''
            },
            {
                path: '/addCourse',
                element: ''
            },
            {
                path: '/appliedList',
                element: ''
            },
            {
                path: '/users',
                element: <Users />
            }
        ]
    }
])