import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './xemTamTru.scss';
function XemTamTru() {
    const { ID } = useParams();

    const [tamTru, setTamTru] = useState(null);
    const [quanHeList, setQuanHeList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/getTT/${ID}`)
          .then(response => {
            setTamTru(response.data);
            setQuanHeList(response.data.QuanHe || []);
          })
          .catch(error => {
            console.log('Lỗi lấy thông tin tạm trú', error);  
          });
      }, [ID]);

    return (
        <div className="container">
            <h1 className="title">Thông tin chi tiết tạm trú</h1>
            
            {tamTru && (
                <div className="info-section">
                    <div className="info-row">
                        <span className="label">Họ tên chủ hộ:</span>
                        <span className="value">{tamTru.HoTen}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Số Căn cước chủ hộ:</span>
                        <span className="value">{tamTru.SoCCCD}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Số điện thoại chủ hộ:</span>
                        <span className="value">{tamTru.SoDT}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Email chủ hộ:</span>
                        <span className="value">{tamTru.Email}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Số nhà:</span>
                        <span className="value">{tamTru.DiaChi.SoNha}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Tên đường:</span>
                        <span className="value">{tamTru.DiaChi.TenDuong}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Phường, xã:</span>
                        <span className="value">{tamTru.DiaChi.PhuongXa}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Quận, huyện:</span>
                        <span className="value">{tamTru.DiaChi.QuanHuyen}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Tỉnh, thành phố:</span>
                        <span className="value">{tamTru.DiaChi.TinhThanh}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Thông tin quan hệ:</span>
                        {quanHeList.map((quanHe, index) => (
                            <div key={index} className="relationship-info">
                                <span className="relationship-label">Họ tên:</span>
                                <span className="relationship-value">{quanHe.HoTen}</span>
                                <span className="relationship-label">Số căn cước:</span>
                                <span className="relationship-value">{quanHe.SoCCCD}</span>
                                <span className="relationship-label">Quan hệ với chủ hộ:</span>
                                <span className="relationship-value">{quanHe.QuanHeChuHo}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default XemTamTru;