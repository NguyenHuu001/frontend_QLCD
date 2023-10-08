import logo from '../../assets/imgs/avatar.png';
import './citizendetails.scss';
import { getAllDC, searchCCCD } from '../../services/qlcd_services';
import { useEffect, useState } from 'react';
function Citizendetails() {
    const cccd = localStorage.getItem('CCCD');

    const [dctt, setdctt] = useState({});
    const [citizen, setCitizen] = useState([]);

    useEffect(() => {
        getCD();
        getDiaChiAll();
    }, []);

    const getCD = async () => {
        try {
            const response = await searchCCCD(cccd).then((res) => {
                setCitizen(res);
                console.log(res);
            });
        } catch (error) {
            console.log('lỗi');
        }
    };

    const getDiaChi = (id) => {
        const matchedItem = dctt.find((item) => item._id === id);
        if (matchedItem) {
            return (
                '' +
                matchedItem.SoNha +
                ' ' +
                matchedItem.TenDuong +
                ' ' +
                matchedItem.PhuongXa +
                ' ' +
                matchedItem.QuanHuyen +
                ' ' +
                matchedItem.TinhThanh
            );
        }
        return 'Chưa Có Địa Chỉ';
    };
    const getDiaChiAll = async () => {
        try {
            const response = await getAllDC();
            // console.log(response);
            setdctt(response);
        } catch (error) {
            console.log('Lỗi');
        }
    };
    return (
        <div className="container mt-5">
            <div className="d-flex flex-wrap">
                {citizen.length > 0 &&
                    citizen.map((item, index) => (
                        <>
                            <div className="col-md-3 d-flex flex-column" key={index}>
                                <div className="ms-4">
                                    <img className="col-md-6 avatar_img" src={logo} alt="vaater" />
                                </div>
                                <span className="mt-3 mb-3">
                                    Họ tên: <b>{item.HoTen}</b>
                                </span>
                                <span>
                                    Giới tính: <b>{item.GioiTinh}</b>
                                </span>
                            </div>
                            <div className="col-md-9">
                                <div>
                                    <h3 style={{ textTransform: 'uppercase', color: '#09c' }}>Thông tin cá nhân</h3>
                                    <hr></hr>
                                </div>
                                <div className="">
                                    <div className="d-flex justify-content-between">
                                        <span>
                                            Ngày sinh: <b>{item.NgaySinh}</b>
                                        </span>
                                        <span>
                                            Dân tộc: <b>{item.DanToc}</b>
                                        </span>
                                        <span>
                                            Quê quán: <b>{item.QueQuan}</b>
                                        </span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-4">
                                        <span>
                                            Số CCCD: <b>{item.SoCCCD}</b>
                                        </span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-4">
                                        <span>
                                            Quốc tịch: <b>{item.QuocTich}</b>
                                        </span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-4">
                                        <span>
                                            Địa chỉ thường trú:
                                            <b> {item.DiaChiThuongTru}</b>
                                        </span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-4">
                                        <span>
                                            Địa chỉ tạm trú: <b>{item.DiaChiTamTru}</b>
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
                        </>
                    ))}
            </div>
        </div>
    );
}

export default Citizendetails;
