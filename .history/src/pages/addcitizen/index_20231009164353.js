import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, Input, Button, DatePicker, message, Upload } from 'antd';
import './addcitizen.scss';
import { UploadOutlined } from '@ant-design/icons';
import { addDataCitizen } from '../../services/qlcd_services';
import { useDropzone } from 'react-dropzone';
import moment from 'moment';

const { Option } = Select;

function AddCitizen() {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [result, setResult] = useState('');
    const [soCCCD, setSoCCCD] = useState('');
    const [hoTen, setHoTen] = useState('');
    const [ngaySinh, setNgaySinh] = useState(null);
    const [gioiTinh, setGioiTinh] = useState('');
    const [danToc, setDanToc] = useState('');
    const [quocTich, setQuocTich] = useState('');
    const [queQuan, setQueQuan] = useState('');
    const [hinh, setHinh] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [fileList, setFileList] = useState([]);

    //Detail Tạm trú
    const [hoTenTT, setHoTenTT] = useState('');
    const [soCCCDTT, setsoCCCDTT] = useState('');
    const [soDTTT, setSoDTTT] = useState('');
    const [emailTT, setEmailTT] = useState('');
    const [selectedCityTT, setSelectedCityTT] = useState('');
    const [selectedDistrictTT, setSelectedDistrictTT] = useState('');
    const [selectedWardTT, setSelectedWardTT] = useState('');
    const [houseNumberTT, setHouseNumberTT] = useState('');
    const [streetNameTT, setStreetNameTT] = useState('');
    const [citiesTT, setCitiesTT] = useState([]);
    const [districtsTT, setDistrictsTT] = useState([]);
    const [wardsTT, setWardsTT] = useState([]);
    const [resultTT, setResultTT] = useState('');
    useEffect(() => {
        // Lấy danh sách tỉnh/thành phố
        axios
            .get('https://provinces.open-api.vn/api/?depth=1')
            .then((response) => {
                setCities(response.data);
                setCitiesTT(response.data);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách tỉnh/thành phố', error);
            });
    }, []);
    const handleImageChange = (info) => {
        if (info.file.status === 'done') {
            // Lấy đường dẫn hình ảnh từ phản hồi của máy chủ
            const imageUrl = info.file.response.url;

            // Lưu đường dẫn hình ảnh vào trạng thái của bạn
            setImageUrl(imageUrl);
        }
    };
    const onDrop = (acceptedFiles) => {
        // Đoạn mã xử lý hình ảnh ở đây. Ví dụ: tải lên hình ảnh và nhận đường dẫn
        const uploadedImage = acceptedFiles[0]; // Giả sử bạn chỉ chọn một hình ảnh

        // Tạo một đối tượng FileReader để đọc hình ảnh thành một chuỗi dữ liệu (base64)
        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result;
            setImageUrl(base64String); // Cập nhật đường dẫn ảnh
        };

        reader.readAsDataURL(uploadedImage);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const handleCityChangeTT = (value, name) => {
        setSelectedCityTT(name.children);
        setSelectedDistrictTT('');
        setSelectedWardTT('');
        setDistrictsTT([]);
        setWardsTT([]);
        setResultTT('');

        // Lấy danh sách quận/huyện dựa trên tỉnh/thành phố được chọn
        axios
            .get(`https://provinces.open-api.vn/api/p/${value}?depth=2`)
            .then((response) => {
                setDistrictsTT(response.data.districts);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách quận/huyện', error);
            });
    };
    const handleDistrictChangeTT = (value, name) => {
        setSelectedDistrictTT(name.children);
        setSelectedWardTT('');
        setWardsTT([]);
        setResultTT('');

        // Lấy danh sách phường/xã dựa trên quận/huyện được chọn
        axios
            .get(`https://provinces.open-api.vn/api/d/${value}?depth=2`)
            .then((response) => {
                setWardsTT(response.data.wards);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách phường/xã', error);
            });
    };
    const handleWardChangeTT = (value, name) => {
        setSelectedWardTT(name.children);
        printResultTT();
    };
    const printResultTT = () => {
        if (selectedCityTT && selectedDistrictTT && selectedWardTT) {
            const cityText = citiesTT.find((city) => city.code === selectedCityTT)?.name;
            const districtText = districtsTT.find((district) => district.code === selectedDistrictTT)?.name;
            const wardText = wardsTT.find((ward) => ward.code === selectedWardTT)?.name;
            const resultText = `${cityText} | ${districtText} | ${wardText}`;

            // Thêm số nhà và tên đường vào kết quả
            const fullAddress = `${houseNumberTT} ${streetNameTT} ${resultText}`;
            setResultTT(fullAddress);
        }
    };
    const handleCityChange = (value, name) => {
        setSelectedCity(name.children);
        setSelectedDistrict('');
        setSelectedWard('');
        setDistricts([]);
        setWards([]);
        setResult('');

        // Lấy danh sách quận/huyện dựa trên tỉnh/thành phố được chọn
        axios
            .get(`https://provinces.open-api.vn/api/p/${value}?depth=2`)
            .then((response) => {
                setDistricts(response.data.districts);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách quận/huyện', error);
            });
    };

    const handleDistrictChange = (value, name) => {
        setSelectedDistrict(name.children);
        setSelectedWard('');
        setWards([]);
        setResult('');

        // Lấy danh sách phường/xã dựa trên quận/huyện được chọn
        axios
            .get(`https://provinces.open-api.vn/api/d/${value}?depth=2`)
            .then((response) => {
                setWards(response.data.wards);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách phường/xã', error);
            });
    };

    const handleWardChange = (value, name) => {
        setSelectedWard(name.children);
        printResult();
    };

    const printResult = () => {
        if (selectedCity && selectedDistrict && selectedWard) {
            const cityText = cities.find((city) => city.code === selectedCity)?.name;
            const districtText = districts.find((district) => district.code === selectedDistrict)?.name;
            const wardText = wards.find((ward) => ward.code === selectedWard)?.name;
            const resultText = `${cityText} | ${districtText} | ${wardText}`;

            // Thêm số nhà và tên đường vào kết quả
            const fullAddress = `${houseNumber} ${streetName} ${resultText}`;
            setResult(fullAddress);
        }
    };

    const AddDetailCitizen = async () => {
        if (
            !soCCCD ||
            !hoTen ||
            !ngaySinh ||
            !gioiTinh ||
            !danToc ||
            !quocTich ||
            !queQuan ||
            !houseNumber ||
            !streetName ||
            !selectedWard ||
            !selectedDistrict ||
            !selectedCity
        ) {
            alert('Vui lòng nhập đầy đủ thông tin công dân và địa chỉ.');
            return;
        }
        const dataCD = {
            SoCCCD: soCCCD,
            HoTen: hoTen,
            NgaySinh: ngaySinh,
            GioiTinh: gioiTinh,
            DanToc: danToc,
            QuocTich: quocTich,
            QueQuan: queQuan,
            SoNha: houseNumber,
            TenDuong: streetName,
            PhuongXa: selectedWard,
            QuanHuyen: selectedDistrict,
            TinhThanh: selectedCity,
            Hinh: imageUrl || 'rỗng',
            IDTT: 'rỗng',
            HoTenTT: hoTenTT || '',
            soCCCDTT: soCCCDTT || '',
            soDTTT: soDTTT || '',
            emailTT: emailTT || '',
            houseNumberTT: houseNumberTT || '',
            streetNameTT: streetNameTT || '',
            selw
        };
        try {
            // const response = await addDataCitizen(dataCD);
        } catch (error) {
            console.log('Lỗi');
        }
    };

    return (
        <div className="container mt-4 p-0">
            <div className="d-flex flex-wrap">
                <div className="col-md-6 d-flex flex-column justify-content-between pe-2" style={{ height: '250px' }}>
                    <div className="d-flex justify-content-center">
                        <h3 style={{ textTransform: 'uppercase', color: '#a04244' }}>Thông tin Công Dân</h3>
                    </div>
                    <div className="d-flex justify-content-between">
                        <Input
                            className="col-md-6 "
                            placeholder="Số CCCD"
                            value={soCCCD}
                            onChange={(e) => setSoCCCD(e.target.value)}
                            style={{ width: '45%' }}
                        />
                        <Input
                            className="col-md-6 "
                            placeholder="Họ Tên"
                            value={hoTen}
                            onChange={(e) => setHoTen(e.target.value)}
                            style={{ width: '45%' }}
                        />
                    </div>
                    <div className="d-flex justify-content-between ">
                        <DatePicker
                            className="col-md-6 "
                            placeholder="Ngày Sinh"
                            value={ngaySinh ? moment(ngaySinh, 'YYYY-MM-DD') : null} // Chuyển đổi ngày sang định dạng của DatePicker
                            onChange={(e, dateString) => setNgaySinh(dateString)}
                            style={{ width: '45%' }}
                        />
                        <Select
                            className="col-md-6 "
                            placeholder="Chọn giới tính"
                            value={gioiTinh}
                            onChange={(e) => setGioiTinh(e)}
                            style={{ width: '45%' }}
                        >
                            <Select.Option value="Nam">Nam</Select.Option>
                            <Select.Option value="Nữ">Nữ</Select.Option>
                        </Select>
                    </div>
                    <div className="d-flex justify-content-between">
                        <Input
                            className="col-md-6 "
                            placeholder="Dân Tộc"
                            value={danToc}
                            onChange={(e) => setDanToc(e.target.value)}
                            style={{ width: '45%' }}
                        />
                        <Input
                            className="col-md-6 "
                            placeholder="Quốc Tịch"
                            value={quocTich}
                            onChange={(e) => setQuocTich(e.target.value)}
                            style={{ width: '45%' }}
                        />
                    </div>
                    <div className="d-flex justify-content-between ">
                        <Input
                            className="col-md-6 "
                            placeholder="Quê Quán"
                            value={queQuan}
                            onChange={(e) => setQueQuan(e.target.value)}
                            style={{ width: '45%' }}
                        />
                        {/* <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload> */}
                        <div className="col-md-6" {...getRootProps()} style={{ width: '45%' }}>
                            <input type="file" {...getInputProps()} />
                            <p>Kéo và thả hoặc nhấn để chọn hình ảnh</p>
                        </div>
                        {/* <Button className="col-md-6 btn_Address" type="" style={{ width: '45%' }}>
                            Thêm Địa Chỉ
                        </Button> */}
                    </div>
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-between ps-2">
                    <div className="d-flex justify-content-center">
                        <h3 style={{ textTransform: 'uppercase', color: '#a04244' }}>Thông tin Địa chỉ thường trú</h3>
                    </div>
                    {/* <div> */}
                    {/* Sử dụng react-dropzone để cho phép người dùng chọn hình ảnh */}

                    {/* Hiển thị hình ảnh đã chọn */}
                    {/* {imageUrl && <img src={imageUrl} alt="Hình ảnh" />}
                    </div> */}
                    <div className="d-flex justify-content-between">
                        <Input
                            placeholder="Số nhà"
                            value={houseNumber}
                            onChange={(e) => {
                                setHouseNumber(e.target.value);
                            }}
                            style={{ width: '45%' }}
                        />
                        <Input
                            placeholder="Tên đường"
                            value={streetName}
                            onChange={(e) => setStreetName(e.target.value)}
                            style={{ width: '45%' }}
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <Select
                            placeholder="Chọn tỉnh/thành phố s"
                            value={selectedCity}
                            onChange={handleCityChange}
                            style={{ width: '45%' }}
                        >
                            {cities.map((city) => (
                                <Option key={city.code} value={city.code}>
                                    {city.name}
                                </Option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Chọn quận/huyện"
                            value={selectedDistrict}
                            onChange={handleDistrictChange}
                            style={{ width: '45%' }}
                        >
                            {districts.map((district) => (
                                <Option key={district.code} value={district.code}>
                                    {district.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="d-flex justify-content-between">
                        <Select
                            placeholder="Chọn phường/xã"
                            value={selectedWard}
                            onChange={handleWardChange}
                            style={{ width: '45%' }}
                        >
                            {wards.map((ward) => (
                                <Option key={ward.code} value={ward.code}>
                                    {ward.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div style={{ width: '45%', height: '49px' }}></div>
                    </div>
                </div>
                <div className="col-md-12 d-flex justify-content-center mt-5" style={{ minHeight: '280px' }}>
                    <div className="col-md-8 d-flex flex-column justify-content-between align-items-between ps-2">
                        <div className="d-flex justify-content-center">
                            <h3 style={{ textTransform: 'uppercase', color: '#a04244' }}>Thông tin Địa chỉ tạm trú</h3>
                        </div>
                        <div className="d-flex justify-content-between align-items-between">
                            <Input
                                className="col-md-6 "
                                placeholder="Số CCCD"
                                value={soCCCDTT}
                                onChange={(e) => setsoCCCDTT(e.target.value)}
                                style={{ width: '45%' }}
                            />
                            <Input
                                className="col-md-6 "
                                placeholder="Họ Tên"
                                value={hoTenTT}
                                onChange={(e) => setHoTenTT(e.target.value)}
                                style={{ width: '45%' }}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <Input
                                className="col-md-6 "
                                placeholder="Số Điện Thoại"
                                value={soDTTT}
                                onChange={(e) => setSoDTTT(e.target.value)}
                                style={{ width: '45%' }}
                            />
                            <Input
                                className="col-md-6 "
                                placeholder="Email"
                                value={emailTT}
                                onChange={(e) => setEmailTT(e.target.value)}
                                style={{ width: '45%' }}
                            />
                        </div>

                        <div className="d-flex justify-content-between">
                            <Input
                                placeholder="Số nhà"
                                value={houseNumberTT}
                                onChange={(e) => {
                                    setHouseNumberTT(e.target.value);
                                }}
                                style={{ width: '45%' }}
                            />
                            <Input
                                placeholder="Tên đường"
                                value={streetNameTT}
                                onChange={(e) => setStreetNameTT(e.target.value)}
                                style={{ width: '45%' }}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <Select
                                placeholder="Chọn tỉnh/thành phố"
                                value={selectedCityTT}
                                onChange={handleCityChangeTT}
                                style={{ width: '45%' }}
                            >
                                {citiesTT &&
                                    citiesTT.map((city) => (
                                        <Option key={city.code} value={city.code}>
                                            {city.name}
                                        </Option>
                                    ))}
                            </Select>
                            <Select
                                placeholder="Chọn quận/huyện"
                                value={selectedDistrictTT}
                                onChange={handleDistrictChangeTT}
                                style={{ width: '45%' }}
                            >
                                {districtsTT &&
                                    districtsTT.map((district) => (
                                        <Option key={district.code} value={district.code}>
                                            {district.name}
                                        </Option>
                                    ))}
                            </Select>
                        </div>
                        <div className="d-flex justify-content-between">
                            <Select
                                placeholder="Chọn phường/xã"
                                value={selectedWardTT}
                                onChange={handleWardChangeTT}
                                style={{ width: '45%' }}
                            >
                                {wardsTT.map((ward) => (
                                    <Option key={ward.code} value={ward.code}>
                                        {ward.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 d-flex justify-content-center mt-5">
                    <div className="btn_Address_add" onClick={() => AddDetailCitizen()}>
                        Thêm Địa Chỉ
                    </div>
                </div>
                {/* <h2 id="result">{result}</h2> */}
            </div>
        </div>
    );
}

export default AddCitizen;
