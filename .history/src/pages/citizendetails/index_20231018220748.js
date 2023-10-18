import logo from '../../assets/imgs/avatar.png';
import './citizendetails.scss';
import { getAllDC, getAllTT, searchCCCD } from '../../services/qlcd_services';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
function Citizendetails() {
    const cccd = localStorage.getItem('CCCD');

    const [dctt, setdctt] = useState([]);
    const [citizen, setCitizen] = useState([]);
    const [allAddressTT, setAllAddressTT] = useState([]);
    const [giayTo, setgiayTo] = useState([]);
    useEffect(() => {
        getCD();
        getAddressTT();
        getDiaChiAll();
    }, []);

    const getTamTru = (id) => {
        const matchedItem = allAddressTT.find((item) => item._id === id);
        if (!matchedItem) return 'Chưa Có Địa Chỉ';
        if (!matchedItem.DiaChi.SoNha) return;
        if (matchedItem) {
            return (
                '' +
                matchedItem.DiaChi.SoNha +
                ' ' +
                matchedItem.DiaChi.TenDuong +
                ', ' +
                matchedItem.DiaChi.PhuongXa +
                ', ' +
                matchedItem.DiaChi.QuanHuyen +
                ', ' +
                matchedItem.DiaChi.TinhThanh
            );
        }
        return 'Chưa Có Địa Chỉ';
    };
    const getCD = async () => {
        try {
            const response = await searchCCCD(cccd).then((res) => {
                setCitizen(res);
                const newGiayTo = [...giayTo]; // Tạo một bản sao mới của mảng giayTo
                res[0].GiayTo.forEach((item) => {
                    newGiayTo.push(item); // Thêm đối tượng vào bản sao của mảng
                });
                setgiayTo(newGiayTo);
            });
        } catch (error) {
            console.log('lỗi');
        }
    };
    const getAddressTT = async () => {
        try {
            const response = await getAllTT().then((res) => {
                setAllAddressTT(res);
            });
        } catch (error) {}
    };
    const getDiaChi = (id) => {
        const matchedItem = dctt.find((item) => item._id === id);
        if (!matchedItem) return 'Chưa Có Địa Chỉ';
        if (!matchedItem.SoNha) return;
        if (matchedItem) {
            return (
                '' +
                matchedItem.SoNha +
                ' ' +
                matchedItem.TenDuong +
                ', ' +
                matchedItem.PhuongXa +
                ', ' +
                matchedItem.QuanHuyen +
                ', ' +
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
            <div>
                {citizen.length > 0 &&
                    citizen.map((item, index) => (
                        <div className="d-flex flex-wrap" key={index}>
                            <div className="col-md-3 d-flex flex-column">
                                <div className="ms-4">
                                    <img
                                        className="col-md-6 avatar_img"
                                        src={item.Hinh === 'Link hình' ? logo : item.Hinh}
                                        alt="vaater"
                                    />
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
                                    <h3 style={{ textTransform: 'uppercase', color: '#a04244' }}>Thông tin cá nhân</h3>
                                    <hr></hr>
                                </div>
                                <div className="">
                                    <div className="d-flex justify-content-between">
                                        <span>
                                            Ngày sinh: <b>{moment(item.NgaySinh).format('DD-MM-YYYY')}</b>
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
                                            <b> {getDiaChi(item.DiaChiThuongTru)}</b>
                                        </span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-4">
                                        <span>
                                            Địa chỉ tạm trú: <b>{getTamTru(item.DiaChiTamTru)}</b>
                                        </span>
                                        <Link
                                            to={`/xemtamtru/${item.DiaChiTamTru}`}
                                            className="btn_detail"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            Xem chi tiết
                                        </Link>
                                        <Link
                                            to={`/suatamtru/${item.DiaChiTamTru}`}
                                            className="btn_update"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            Sửa
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-4">
                                <div>
                                    <h3 style={{ textTransform: 'uppercase', color: '#a04244' }}>Giấy tờ tùy thân</h3>
                                    <hr></hr>
                                </div>
                                <div className="col-md-5">
                                    <div className="d-flex justify-content-between">
                                        {giayTo &&
                                            giayTo.map((item, index) => (
                                                <div className="col-md-6" key={index}>
                                                    <span>
                                                        Số giấy tờ: <b>{item.SoGT}</b>
                                                    </span>
                                                    <div>
                                                        <span>
                                                            Loại giấy tờ: <b>{item.LoaiGT}</b>
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Citizendetails;
