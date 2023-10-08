import logo from '../../assets/imgs/avatar.png';
import './citizendetails.scss'
function Citizendetails() {
    return (
        <div className="container mt-5">
            <div className="col-md-3 d-flex flex-column">
                <div className="me-5">
                    <img className="col-md-6 avatar_img" src={logo} alt="vaater"  />
                </div>
                <span className="mt-3 mb-3">
                    Họ tên: <b>Nguyễn Đức Hữu</b>
                </span>
                <span>
                    Giới tính: <b>Nam</b>
                </span>
            </div>
        </div>
    );
}

export default Citizendetails;
