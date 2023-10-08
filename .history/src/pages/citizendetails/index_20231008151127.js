import logo from '../../assets/imgs/avatar.png';
import './citizendetails.scss';
import { getCDWithCCCD } from '../../services/qlcd_services';
import { useEffect, useState } from 'react';
function Citizendetails() {
    const cccd = localStorage.getItem('CCCD');

    const [congDan, setCongDan] = useState([]);
    const [diaChiTamTru, setDiaChiTamTru] = useState([]);
    const [diaChiThuongTru, setDiaChiThuongTru] = useState([]);

    useEffect(() => {
        getCD();
    }, []);
    const getCD = async () => {
        try {
            const response = await getCDWithCCCD(cccd).then((res) => {
                setCongDan(res.CongDan);
                setDiaChiTamTru(res.DiaChiTamTru);
                setDiaChiThuongTru(res.DiaChiThuongTru);
            });
        } catch (error) {
            console.log('lỗi');
        }
    };
    return (
        <div className="container mt-5">
            <div className="d-flex flex-wrap">
                {congDan > 0 &&
                    congDan.map((item, index) => {
                        <div className="col-md-3 d-flex flex-column" key={index}>
                            <div className="ms-4">
                                <img className="col-md-6 avatar_img" src={logo} alt="vaater" />
                            </div>
                            <span className="mt-3 mb-3">
                                Họ tên: <b>{item.HoTen}</b>
                            </span>
                            <span>
                                Giới tính: <b>Nam</b>
                            </span>
                        </div>;
                    })}

                <div className="col-md-9">
                    <div>
                        <h3 style={{ textTransform: 'uppercase', color: '#09c' }}>Thông tin cá nhân</h3>
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
                                Địa chỉ thường trú: <b>Thôn Minh Đức, Xã Hòa Kiến, TP Tuy Hòa, Tỉnh Phú Yên</b>
                            </span>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                            <span>
                                Địa chỉ tạm trú: <b>Thôn Minh Đức, Xã Hòa Kiến, TP Tuy Hòa, Tỉnh Phú Yên</b>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-4">
                    <div>
                        <h3 style={{ textTransform: 'uppercase', color: '#09c' }}>Giấy tờ tùy thân</h3>
                        <hr></hr>
                    </div>
                    <div className="col-md-5">
                        <div className="d-flex justify-content-between">
                            <span>
                                Số giấy tờ: <b>200100</b>
                            </span>
                            <span>
                                Loại giấy tờ: <b>Bảo hiểm y tế</b>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Citizendetails;
