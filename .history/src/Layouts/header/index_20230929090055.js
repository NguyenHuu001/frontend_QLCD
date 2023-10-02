import './header.scss';
import background from '../../assets/imgs/background-headers.png';
function Header() {
    return (
        <header className="container header">
            <img src={background} style={{ width: '100%', position:'relative' }} />
            <h1 style={{position:'relative',top:'0'}}>Quản lý công dân</h1>
        </header>
    );
}

export default Header;
