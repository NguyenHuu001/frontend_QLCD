import './header.scss';
import background from '../../assets/imgs/background-headers.png';
function Header() {
    return (
        <header className="container header">
            <img src={background} style={{ width: '100%', position:'relative' }} />
            
        </header>
    );
}

export default Header;
