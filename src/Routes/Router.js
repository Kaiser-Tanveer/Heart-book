import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import Login from "../LogIn/LogIn";
import Register from "../LogIn/Register";
import MyPosts from "../Pages/Home/MyPosts/MyPosts";

const router = createBrowserRouter([
    {
        path: '*',
        element: <NotFound />
    },
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/home',
                element: <Home />,
                loader: async () => await fetch('http://localhost:5000/posts')
            },
            {
                path: '/posts',
                element: <MyPosts />,
            },
            {
                path: 'logIn',
                element: <Login />
            },
            {
                path: 'reg',
                element: <Register />
            },
        ]
    }
]);

export default router;