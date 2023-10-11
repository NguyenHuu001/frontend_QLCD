import Home from '../pages/home';
import Login from '../pages/login';
import Citizendetails from '../pages/citizendetails';
import AddCitizen from '../pages/addcitizen';
import SuaTamTru from '../pages/SuaTamTru';
import TamTru from '../pages/TamTru';
import xemTamTru from '../pages/xemTamTru';
import themTamTru from '../pages/themTamTru';
const publicRoutes = [
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/Citizendetails', component: Citizendetails },
    { path: '/addcitizen', component: AddCitizen },
    { path: '/suatamtru', component: AddCitizen },
    { path: '/suatamtru', component: TamTru },
    { path: '/suatamtru', component: xemTamTru },
    { path: '/suatamtru', component: themTamTru },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
