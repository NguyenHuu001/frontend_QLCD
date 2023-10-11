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
                        <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                            <div className="header_item ">Trang chủ</div>
                        </Link>
                        <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
                            <div className="header_item ms-4">Thông tin chi tiết</div>
                        </Link>
                    </div>
                </div>
            </header>
            <nav class="menu">
                <ul>
                    <li>
                        <a href="/login">Trang chủ</a>
                    </li>
                    <li>
                        <a href="/home">Thông tin</a>
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
