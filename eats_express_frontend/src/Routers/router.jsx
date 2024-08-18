import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import HomeComp from "../Components/HomeComp";
import ShopComp from "../Components/ShopComp";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadProducts from "../dashboard/UploadProducts";
import ManageProducts from "../dashboard/ManageProducts";
import EditProducts from "../dashboard/EditProducts";
import { SingleProduct } from "../Components/SingleProduct";
import { CartComp } from "../Components/CartComp";
import { CheckOutComp } from "../Components/CheckOutComp";
import { Login } from "../Components/Login";
import { FavouriteComp } from "../Components/FavouriteComp";
import SignUp from "../Components/Signup";
import ManageCategory from "../dashboard/ManageCategory";
import ManageUsers from "../dashboard/ManageUsers";
import EditUser from "../dashboard/EditUser";
import Logout from "../Components/Logout";
import Orders from "../dashboard/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeComp />,
      },

      {
        path: "/favs",
        element: <FavouriteComp />,
      },

      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/shop",
        element: <ShopComp />,
      },
      {
        path: "/cart",
        element: <CartComp />,
      },
      {
        path: "/checkout/:cartId/:price",
        element: <CheckOutComp />,
        loader: async ({ params }) => {
          const price = parseFloat(params.price);
          const cartId = parseInt(params.cartId);
          return { price, cartId };
        },
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
        loader: ({ params }) =>
          fetch(`http://localhost:8080/products/${params.id}`),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/dashboard/upload",
        element: <UploadProducts />,
      },
      {
        path: "/admin/dashboard/manage-products",
        element: <ManageProducts />,
      },
      {
        path: "/admin/dashboard/edit/:productId",
        element: <EditProducts />,
        loader: ({ params }) =>
          fetch(`http://localhost:8080/product/${params.productId}`),
      },
      {
        path: "/admin/dashboard/category",
        element: <ManageCategory />,
      },
      {
        path: "/admin/dashboard/manage-users",
        element: <ManageUsers />,
      },
      {
        path: "/admin/dashboard/manage-users/edit/:userId",
        element: <EditUser />,
      },
      {
        path: "/admin/dashboard/orders",
        element: <Orders />
      }
    ],
  },
]);
export default router;
