import './header.scss';
import background from '../../assets/imgs/background-headers.png';
b
function Header() {
    return (
        <header className="container-fliud header d-flex justify-content-center align-items-center">
            <img src={background} style={{ width: '100%', position: 'relative' }} alt='log' />
            <div className="title_header">
                <img src/>
            </div>
        </header>
    );
}

export default Header;
