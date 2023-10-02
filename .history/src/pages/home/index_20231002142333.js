import './home.scss';
import { Select, Input } from 'antd';
import React, { useState } from 'react';
import { getAllCD, getAllDC } from '../../services/qlcd_services';
import { useEffect } from 'react';
const { Search } = Input;
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const onSearch = (value, _e, info) => console.log(info?.source, value);

function Home() {
    const [congDan, setCongDan] = useState([]);
    const [dctt, setdctt] = useState({});
    useEffect(() => {
        getDiaChiAll();
        getAllCongDan();
    }, []);
    const getAllCongDan = async () => {
        try {
            const responsave = await getAllCD().then((res) => {
                setCongDan(res);
            });
        } catch (error) {
            console.log('LỖi');
        }
    };
    const kk = (id) => {
        dctt.map((item) => {
            if (item._id === id) {
                return (
                    '' +
                    item.SoNha +
                    '' +
                    item.TenDuong +
                    '' +
                    item.PhuongXa +
                    '' +
                    item.QuanHuyen +
                    '' +
                    item.TinhThanh
                );
            }
            return ''
        });
    };
    // const kk = (id) => {
    //     const matchedItem = dctt.find((item) => item._id === id);
    //     if (matchedItem) {
    //         return (
    //             '' +
    //             matchedItem.SoNha +
    //             ' ' +
    //             matchedItem.TenDuong +
    //             ' ' +
    //             matchedItem.PhuongXa +
    //             ' ' +
    //             matchedItem.QuanHuyen +
    //             ' ' +
    //             matchedItem.TinhThanh
    //         );
    //     }
        return null; // Hoặc trả về giá trị mặc định khác tùy ý
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
        <div className="container mt-4 p-0">
            <div>
                <div>
                    <Search
                        placeholder="input search text"
                        onSearch={onSearch}
                        style={{
                            width: 200,
                        }}
                    />
                </div>
                <div className="d-flex justify-content-end align-items-center">
                    <span className="me-2">Sắp xếp:</span>
                    <Select
                        defaultValue="Mặc định"
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: '1',
                                label: 'Tăng dần',
                            },
                            {
                                value: '2',
                                label: 'Giảm dần',
                            },
                        ]}
                    />
                </div>
            </div>
            <div className="d-flex mt-4">
                <div className="col-md-1 item">STT</div>
                <div className="col-md-2 item">Họ Tên</div>
                <div className="col-md-1 item">Năm sinh</div>
                <div className="col-md-1 item">Giới tính</div>
                <div className="col-md-1 item">Số CCCD</div>
                <div className="col-md-3 item">Địa chỉ thường trú</div>
            </div>
            {congDan &&
                congDan.map((item, index) => (
                    <div className="d-flex mt-3 no-wrap align-items-center" key={item._id}>
                        <div className="col-md-1 item">{index + 1}</div>
                        <div className="col-md-2 item">{item.HoTen}</div>
                        <div className="col-md-1 item">{item.NgaySinh}</div>
                        <div className="col-md-1 item">{item.GioiTinh}</div>
                        <div className="col-md-1 item">{item.SoCCCD}</div>
                        <div className="col-md-3 item">{kk(item.DiaChiThuongTru)}</div>
                        <button className="btn_detail">Xem chi tiết</button>
                        <button className="btn_update">Sửa</button>
                        <button className="btn_delete">Xóa</button>
                    </div>
                ))}
        </div>
    );
}

export default Home;
