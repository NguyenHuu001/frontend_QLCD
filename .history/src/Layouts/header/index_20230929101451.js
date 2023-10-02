import './header.scss';
import background from '../../assets/imgs/background-headers.png';
import logo from '../../assets/imgs/sv_logo_dashboard.png';
function Header() {
    return (
        <header className="container-fluid p-0 header d-flex align-items-center">
            <img src={background} style={{ width: '100%', position: 'relative' }} alt="log" />
            <div className="title_header container-fluid" style={{ width: '100%' }}>
                <img src={logo} alt="logo" />
            </div>
        </header>
    );
}

export default Header;
