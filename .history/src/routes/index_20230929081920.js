import Home from "../pages/home";
import Login from '../pages/login';
const publicRoutes = [
    { path: '/home', component: Home },
    { path: '/login', component: Home },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };