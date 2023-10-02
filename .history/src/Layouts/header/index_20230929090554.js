import './header.scss';
import background from '../../assets/imgs/background-headers.png';
function Header() {
    return (
        <header className="container-fliud header d-flex justify-content-center align">
            <img src={background} style={{ width: '100%', position:'relative' }} />
            <h3 className='title_header' >Quản lý công dân</h3>
        </header>
    );
}

export default Header;
