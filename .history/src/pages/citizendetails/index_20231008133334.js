import logo from '../../assets/imgs/avatar.png';
import './citizendetails.scss';
function Citizendetails() {
    return (
        <div className="container mt-5">
            <div className="d-flex">
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
                <div className="col-md-9">
                    <div>
                        <h3>Thông tin cá nhân</h3>
                        <hr></hr>
                    </div>
                    <div className="">
                        <div className="d-flex justify-content-between">
                            <span>
                                Ngày sinh: <b>11/11/2002</b>
                            </span>
                            <span>
                                Dân tộc: <b>Kinh</b>
                            </span>
                            <span>
                                Quê quán: <b>Phú Yên</b>
                            </span>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                            <span>
                                Số CCCD: <b>123456789</b>
                            </span>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                            <span>
                                Quốc tịch: <b>Việt Nam</b>
                            </span>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                            <span>
                                Địa chỉ liên hệ: <b>Việt Nam</b>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Citizendetails;
