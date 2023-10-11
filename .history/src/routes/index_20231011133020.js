import Home from '../pages/home';
import Login from '../pages/login';
import Citizendetails from '../pages/citizendetails';
import AddCitizen from '../pages/addcitizen';
import SuaTamTru from '../pages/SuaTamTru';
import TamTru from '../pages/TamTru';
import xemTamTru from '../pages/xemTamTru';
import themTamTru from '../pages/themTamTru';
import In
const publicRoutes = [
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/Citizendetails', component: Citizendetails },
    { path: '/addcitizen', component: AddCitizen },
    { path: '/suatamtru/:ID', component: SuaTamTru },
    { path: '/tamtru', component: TamTru },
    { path: '/xemtamtru/:ID', component: xemTamTru },
    { path: '/themtamtru', component: themTamTru },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
