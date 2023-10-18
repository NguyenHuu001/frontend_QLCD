import './home.scss';
import { Select, Input } from 'antd';
import React, { useState } from 'react';
import {
    getAllCD,
    getAllDC,
    sortName,
    sortBirth,
    searchCCCD,
    searchName,
    deleteCD,
    deleteDC,
    deleteTT,
} from '../../services/qlcd_services';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
const { Search } = Input;

function Home() {
    const [congDan, setCongDan] = useState([]);
    const [dctt, setdctt] = useState({});
    useEffect(() => {
        getDiaChiAll();
        getAllCongDan();
    }, []);
    const getAllCongDan = async () => {
        try {
            const response = await getAllCD().then((res) => {
                setCongDan(res);
            });
        } catch (error) {
            console.log('LỖi');
        }
    };
    const getDiaChi = (id) => {
        const matchedItem = dctt.find((item) => item._id === id);
        if (matchedItem.SoNha) {
            return (
                '' +
                matchedItem.SoNha +
                ', ' +
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
    const sortWithName = async () => {
        try {
            const response = await sortName().then((res) => {
                setCongDan(res);
            });
        } catch (error) {
            console.log('Lỗi');
        }
    };
    const sortWithBirth = async () => {
        try {
            const response = await sortBirth().then((res) => {
                setCongDan(res);
            });
        } catch (error) {
            console.log('Lỗi');
        }
    };
    const handleChange = (value) => {
        if (value === 1) {
            sortWithName();
        } else {
            sortWithBirth();
        }
    };
    const onSearchCCCD = async (value, _e, info) => {
        try {
            const response = await searchCCCD(value).then((res) => {
                setCongDan(res);
            });
        } catch (error) {
            console.log('Lỗi');
        }
    };
    const onSearchName = async (value, _e, info) => {
        try {
            const response = await searchName(value).then((res) => {
                setCongDan(res);
            });
        } catch (error) {
            console.log('Lỗi');
        }
    };
    const getCD = (SoCCCD) => {
        localStorage.setItem('CCCD', SoCCCD);
    };
    const edit = async (CCCD, idCD, idDC, idTT) => {
        localStorage.setItem('CCCD', CCCD);
        localStorage.setItem('idDC', idDC);
        localStorage.setItem('idTT', idTT);
        localStorage.setItem('idCD', idCD);
    };
    const deleteCitizen = async (_IDCD, _IDDC, _IDTT) => {
        try {
            await De
        } catch (error) {
            console.log('LỖi');
        }
    }
    return (
        <div className="container mt-4 p-0">
            <div className="d-flex justify-content-between">
                <div>
                    <div>
                        <Search
                            placeholder="Tìm kiếm theo CCCD"
                            color="red"
                            onSearch={onSearchCCCD}
                            style={{
                                width: 200,
                            }}
                        />
                    </div>
                    <div className="mt-3">
                        <Search
                            placeholder="Tìm kiếm theo tên"
                            color="red"
                            onSearch={onSearchName}
                            style={{
                                width: 200,
                            }}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                    <span className="me-2">Sắp xếp:</span>
                    <Select
                        defaultValue="Mặc định"
                        style={{
                            width: 150,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 1,
                                label: 'Theo Tên',
                            },
                            {
                                value: 2,
                                label: 'Theo Năm Sinh',
                            },
                        ]}
                    />
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <Link to="/addcitizen">
                    <FontAwesomeIcon className="iocn_add" icon={faSquarePlus} size="2xl" style={{ color: '#05ef01' }} />
                </Link>
            </div>
            <div className="d-flex mt-4 title_table">
                <div className="col-md-1 item">
                    <b>STT</b>
                </div>
                <div className="col-md-2 item">
                    <b>Họ Tên</b>
                </div>
                <div className="col-md-1 item">
                    <b>Năm sinh</b>
                </div>
                <div className="col-md-1 item">
                    <b>Giới tính</b>
                </div>
                <div className="col-md-1 item">
                    <b>Số CCCD</b>
                </div>
                <div className="col-md-3 item">
                    <b>Địa chỉ thường trú</b>
                </div>
            </div>
            {congDan &&
                congDan.map((item, index) => (
                    <div key={item._id}>
                        <div className="d-flex mt-3 no-wrap align-items-center">
                            <div className="col-md-1 item">{index + 1}</div>
                            <div className="col-md-2 item">{item.HoTen}</div>
                            <div className="col-md-1 item">{item.NgaySinh}</div>
                            <div className="col-md-1 item">{item.GioiTinh}</div>
                            <div className="col-md-1 item">{item.SoCCCD}</div>
                            <div className="col-md-3 item">{getDiaChi(item.DiaChiThuongTru)}</div>
                            <Link to="/citizendetails">
                                <button className="btn_detail" onClick={() => getCD(item.SoCCCD)}>
                                    Xem chi tiết
                                </button>
                            </Link>
                            <Link to="/editcitizen">
                                <button
                                    className="btn_update"
                                    onClick={() => edit(item.SoCCCD, item._id, item.DiaChiThuongTru, item.DiaChiTamTru)}
                                >
                                    Sửa
                                </button>
                            </Link>
                            <button className="btn_delete">Xóa</button>
                        </div>
                        <hr></hr>
                    </div>
                ))}
        </div>
    );
}

export default Home;
