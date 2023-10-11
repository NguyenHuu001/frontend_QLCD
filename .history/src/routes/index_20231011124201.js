import Home from '../pages/home';
import Login from '../pages/login';
import Citizendetails from '../pages/citizendetails';
import AddCitizen from '../pages/addcitizen';
import SuaTamTru from '../pages/SuaTamTru';
const publicRoutes = [
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/Citizendetails', component: Citizendetails },
    { path: '/addcitizen', component: AddCitizen },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
