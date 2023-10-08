import Home from "../pages/home";
import Login from '../pages/login';
import C
const publicRoutes = [
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/myhome', component: MyHome },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };