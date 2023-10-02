import './header.scss';
import background from '../../assets/imgs/background-headers.png';
function Header() {
    return (
        <header className="container-fliud header d-flex justify-content-center">
            <img src={background} style={{ width: '100%', position:'relative' }} />
            <h1 className='title_header' >Quản lý công dân</h1>
        </header>
    );
}

export default Header;
