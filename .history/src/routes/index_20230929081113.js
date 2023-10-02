import Home from "../pages/home";
const publicRoutes = [
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/product', component: Product },
    { path: '/cart', component: Cart },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };