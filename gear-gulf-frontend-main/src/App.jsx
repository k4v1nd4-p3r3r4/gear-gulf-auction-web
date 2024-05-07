import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginLayout from "./Layout/LoginLayout";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Login/Signup";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contact/Contact";
import MyBids from "./Pages/MyBids/MyBids";
import Sell from "./Pages/Sell/Sell";
import Image from "./Pages/Login/Image.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/log-in",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/image",
        element: <Image />,
      },
    ]
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/my-bids",
        element: <MyBids />,
      },
      {
        path: "/sell",
        element: <Sell />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/sign-up",
        // element: <Signup />,
      },
    ]
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App
