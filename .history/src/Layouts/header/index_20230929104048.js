import './header.scss';
import background from '../../assets/imgs/background-headers.png';
import logo from '../../assets/imgs/sv_logo_dashboard.png';
function Header() {
    return (
        <header className="container-fluid p-0 header d-flex justify-content-center align-items-center">
            <img src={background} style={{ width: '100%', position: 'relative' }} alt="log" />
            <div className="title_header container d-flex " style={{ width: '100%' }}>
                <img className='col-md-2' src={logo} alt="logo" />
                <div className='d-flex col-md-10'>
                    <div className='col-md-1'>Trang chủ</div>
                    <div className='col-md-2'>Thông tin chi tiết</div>
                </div>
            </div>
        </header>
    );
}

export default Header;
