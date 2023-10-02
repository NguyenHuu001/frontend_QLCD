import './header.scss';
import background from '../../assets/imgs/background-headers.png';
import logo from '../../assets/imgs/sv_logo_dashboard.png';
function Header() {
    return (
        <header className="container-fliud header d-flex align-items-center">
            <img src={background} style={{ width: '100%', position: 'relative' }} alt='log' />
            <div className="title_header">
                <div className='container'><img src={logo} alt='logo'/></div>
            </div>
        </header>
    );
}

export default Header;
