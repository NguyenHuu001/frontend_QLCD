import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './xemTamTru.scss';
function XemTamTru() {
    const { ID } = useParams();

    const [tamTru, setTamTru] = useState(null);
    const [quanHeList, setQuanHeList] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/getTT/${ID}`)
            .then((response) => {
                setTamTru(response.data);
                setQuanHeList(response.data.QuanHe || []);
            })
            .catch((error) => {
                console.log('Lỗi lấy thông tin tạm trú', error);
            });
    }, [ID]);

    return (
        <div className="container">
            <div className="body">
                <h1 className="title">Thông tin chi tiết tạm trú</h1>
                <div className="btn">
                    <button>
                        <a href="/tamtru    ">Trở về</a>
                    </button>
                </div>
                {tamTru && (
                    <div className="info-section">
                        <div className="info-row">
                            <b className="label">Họ tên chủ hộ: </b>
                            <span className="value">{tamTru.HoTen}</span>
                        </div>

                        <div className="info-row">
                            <b className="label">Số Căn cước chủ hộ: </b>
                            <span className="value">{tamTru.SoCCCD}</span>
                        </div>
                        <div className="info-row">
                            <b className="label">Số điện thoại chủ hộ: </b>
                            <span className="value">{tamTru.SoDT}</span>
                        </div>
                        <div className="info-row">
                            <b className="label">Email chủ hộ: </b>
                            <span className="value">{tamTru.Email}</span>
                        </div>
                        <div className="info-row">
                            <b className="label">Số nhà: </b>
                            <span className="value">{tamTru.DiaChi.SoNha}</span>
                        </div>
                        <div className="info-row">
                            <b className="label">Tên đường: </b>
                            <span className="value">{tamTru.DiaChi.TenDuong}</span>
                        </div>
                        <div className="info-row">
                            <b className="label">Phường, xã: </b>
                            <span className="value">{tamTru.DiaChi.PhuongXa}</span>
                        </div>
                        <div className="info-row">
                            <b className="label">Quận, huyện: </b>
                            <span className="value">{tamTru.DiaChi.QuanHuyen}</span>
                        </div>
                        <div className="info-row">
                            <b className="label">Tỉnh, thành phố:</b>
                            <span className="value">{tamTru.DiaChi.TinhThanh}</span>
                        </div>
                        <div className="info-row">
                            <h3 className="label">Thông tin quan hệ:</h3>

                            {quanHeList.map((quanHe, index) => (
                                <div key={index} className="relationship-info">
                                    <b className="relationship-label">Họ tên: </b>
                                    <span className="relationship-value">{quanHe.HoTen}</span>
                                    <br></br>
                                    <b className="relationship-label">Số căn cước: </b>
                                    <span className="relationship-value">{quanHe.SoCCCD}</span>
                                    <br></br>
                                    <b className="relationship-label">Quan hệ với chủ hộ: </b>
                                    <span className="relationship-value">{quanHe.QuanHeChuHo}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default XemTamTru;
