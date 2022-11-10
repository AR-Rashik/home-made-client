import Main from "../../../Layout/Main";
import AddService from "../../AddService/AddService";
import Blog from "../../Blog/Blog";
import Home from "../../Home/Home/Home";
import DetailsService from "../../Home/Services/DetailsService";
import ServicesAll from "../../Home/Services/ServicesAll";
import Login from "../../Login/Login";
import MyReviews from "../../MyReviews/MyReviews";
import UpdateReview from "../../MyReviews/UpdateReview";
import SignUp from "../../SignUp/SignUp";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/services",
        element: <ServicesAll></ServicesAll>,
      },
      {
        path: "/services/:id",
        element: <DetailsService></DetailsService>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/services/${params.id}`),
      },
      {
        path: "/myreviews",
        element: <MyReviews></MyReviews>,
      },
      {
        path: "/addservice",
        element: <AddService></AddService>,
      },
      {
        path: "/myreviews/update/:id",
        element: <UpdateReview></UpdateReview>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/myreviews/update/${params.id}`),
      },
    ],
  },
]);

export default router;
