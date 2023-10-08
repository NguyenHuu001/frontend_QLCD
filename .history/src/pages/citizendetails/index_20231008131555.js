import logo from '../../assets/imgs/avatar.png';
import './citizendetails.scss';
function Citizendetails() {
    return (
        <div className="container mt-5">
            <div className='d-flex'>
                <div className="col-md-3 d-flex flex-column">
                    <div className="ms-4">
                        <img className="col-md-6 avatar_img" src={logo} alt="vaater" />
                    </div>
                    <span className="mt-3 mb-3">
                        Họ tên: <b>Nguyễn Đức Hữu</b>
                    </span>
                    <span>
                        Giới tính: <b>Nam</b>
                    </span>
                </div>
                <div>
                    <h3>Thông tin cá nhân</h3>
                    <hr></hr>
                </div>
            </div>
        </div>
    );
}

export default Citizendetails;
