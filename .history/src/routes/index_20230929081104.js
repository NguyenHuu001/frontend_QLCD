import Home from "../pages/home";
import Login from "../pages/login";
import Product from "../pages/product";
import Cart from "../pages/cart";
const publicRoutes = [
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/product', component: Product },
    { path: '/cart', component: Cart },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };