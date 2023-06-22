import { Navigate } from "react-router-dom";
import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";

const routes = [
    {
        path: '/',
        element: <LoginPage />
    },
    {
        path: '/home',
        element: <HomePage />
    },
    {
        path: '*',
        element: <Navigate to="/" />
    }
];

export const getRoutes = routes;