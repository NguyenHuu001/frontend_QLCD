import Home from '../pages/home';
import Login from '../pages/login';
import Citizendetails from '../pages/Citizendetails';
const publicRoutes = [
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/Citizendetails', component: Citizendetails },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
