import { lazy } from "react";
import Menus from "../../features/frontend/menus/Menus";
import CheckoutItem from "../../features/frontend/order-checkout/OrderCheckout";

const Home = lazy(() => import("../../features/frontend/home/Home"));
const Menu = lazy(() => import("../../features/frontend/menus/Menus"));
const Login = lazy(() => import("../../features/frontend/login/Login"));
const Feedback = lazy(
  () => import("../../features/frontend/feedback/Feedback")
);
const OrderCheckout = lazy(
  () => import("../../features/frontend/order-checkout/OrderCheckout")
);
const ForgotPassword = lazy(() => import("../../features/frontend/forgot-password/ForgotPassword"));
const ResetPassword = lazy(() => import("../../features/frontend/reset-password/ResetPassword"));


export default [
  {
    label: "Home",
    path: "",
    component: <Home />,
    showInMenu:true
  },
  {
    label: "Menus",
    path: "menus",
    component: <Menus />,
    showInMenu:true
  },
  {
    label: "Feedback",
    path: "feedback",
    component: <Feedback />,
    showInMenu:true
  },
  {
    label: "Orders",
    path: "order-checkout",
    component: <OrderCheckout />,
    showInMenu:true
  },
  {
    label: "Login",
    path: "login",
    component: <Login />,
    showInMenu:true
  },
  {
    label: "Forgot Password",
    path: "forgot-password",
    component: <ForgotPassword />,
    showInMenu:false
  },
  {
    label: "Reset Password",
    path: "change-password/:token",
    component: <ResetPassword />,
    showInMenu:false
  },
];
