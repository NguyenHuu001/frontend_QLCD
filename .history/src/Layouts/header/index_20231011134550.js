import './header.scss';
import background from '../../assets/imgs/background-headers.png';
import logo from '../../assets/imgs/sv_logo_dashboard.png';
import { Link } from 'react-router-dom';
function Header() {
    return (
        <div>
            <header className="container-fluid p-0 header d-flex justify-content-center align-items-center">
                <img src={background} style={{ width: '100%', position: 'relative' }} alt="log" />
                <div className="title_header container d-flex " style={{ width: '100%' }}>
                    <img className="col-md-2" src={logo} alt="logo" />
                    <div className="d-flex col-md-10 justify-content-center align-items-center">
                        <Link to="/home" style={{ textDecoration: 'none', color: 'black', textSi }}>
                            <div className="header_item ">Quản lý công dân</div>
                        </Link>
                     
                    </div>
                </div>
            </header>
            <nav class="menu">
                <ul>
                    <li>
                        <a href="/home">Trang chủ</a>
                    </li>
                    <li>
                        <a href="/citizendetails">Thông tin</a>
                    </li>
                    <li>
                        <a href="/contact">Liên hệ</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
