import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import Login from "../LogIn/LogIn";
import Register from "../LogIn/Register";
import Banner from "../Pages/Home/Banner";
import UserProfile from "../Pages/UserProfile/UserProfile";
import AllPosts from "../Pages/Home/AllPosts/Post";

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
                element: <Home />,
                loader: async () => await fetch('https://fb-demo-server.vercel.app/posts')
            },
            {
                path: '/home',
                element: <Home />,
                loader: async () => await fetch('https://fb-demo-server.vercel.app/posts')
            },
            {
                path: '/profile',
                element: <UserProfile />,

            },
            {
                path: '/banner',
                element: <Banner />,
            },
            {
                path: '/posts',
                element: <AllPosts />,
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