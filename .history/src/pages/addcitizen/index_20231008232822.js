import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, Input, Button, DatePicker, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { okkkk } from '../../services/qlcd_services';
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

    useEffect(() => {
        // Lấy danh sách tỉnh/thành phố
        axios
            .get('https://provinces.open-api.vn/api/?depth=1')
            .then((response) => {
                setCities(response.data);
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

    const handleCityChange = (value) => {
        setSelectedCity(value);
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

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
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

    const handleWardChange = (value) => {
        setSelectedWard(value);
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

    const handleAddAddress = () => {
        // Kiểm tra xem đã nhập đủ thông tin chưa
        if (!selectedCity || !selectedDistrict || !selectedWard || !houseNumber || !streetName) {
            alert('Vui lòng nhập đầy đủ thông tin địa chỉ.');
            return;
        }
        const cityText = cities.find((city) => city.code === selectedCity)?.name;
        const districtText = districts.find((district) => district.code === selectedDistrict)?.name;
        const wardText = wards.find((ward) => ward.code === selectedWard)?.name;

        // Tạo đối tượng địa chỉ để gửi lên API
        const newCD = {
            SoCCCD: soCCCD,
            HoTen: hoTen,
            NgaySinh: ngaySinh,
            GioiTinh: gioiTinh,
            DanToc: danToc,
            QuocTich: quocTich,
            QueQuan: queQuan,
            Hinh: imageUrl,
            DiaChiThuongTru: {
                SoNha: houseNumber,
                TenDuong: streetName,
                PhuongXa: wardText,
                QuanHuyen: districtText,
                TinhThanh: cityText,
            },
        };
        console.log(newCD);

        // Gửi yêu cầu thêm địa chỉ bằng Axios
        // axios
        //     .post('http://localhost:8000/api/themCongDan', newCD)
        //     .then((response) => {
        //         // Xử lý kết quả từ máy chủ, ví dụ: hiển thị thông báo thành công
        //         alert('Đã thêm công dân thành công!');
        //     })
        //     .catch((error) => {
        //         // Xử lý lỗi từ máy chủ, ví dụ: hiển thị thông báo lỗi
        //         console.error('Lỗi khi thêm địa chỉ', error);
        //     });
    };
    const Okk = async () => {
        const newCD = {
            SoCCCDcd: soCCCD,
            HoTencd: hoTen,
            NgaySinhcd: '2002-06-04',
            GioiTinhcd: 'Nam',
            DanToccd: 'Kinh',
            QuocTichcd: 'Việt Nam',
            QueQuancd: 'Huế',
            Hinhcd: 'Link hình',
        };
        // const newTT = {
        //     HoTentt: 'Nguyễn Bá Thanh',
        //     SoCCCDtt: '2020312144',
        //     SoDTtt: '02656566651',
        //     Emailtt: 'bathanh@gmail.com',
        //     DiaChi: {
        //         SoNhatt: '30',
        //         TenDuongtt: 'Hoàng Hoa Thám',
        //         PhuongXatt: 'Phường 13',
        //         QuanHuyentt: 'Quận Tân Bình',
        //         TinhThanhtt: 'Tp Hồ Chí Minh',
        //     },
        // };
        // const newDC = {
        //     SoNhadc: '66',
        //     TenDuongdc: 'Hùng Vương',
        //     PhuongXadc: 'P. Phú Nhuận',
        //     QuanHuyendc: 'tp.Huế',
        //     TinhThanhdc: 'Thừa Thiên Huế',
        // };
        try {
            const response = await okkkk(newCD);
        } catch (error) {
            console.log('Lỗi');
        }
    };
    return (
        <div className="container mt-4 p-0">
            <div>
                <Input
                    placeholder="Số CCCD"
                    value={soCCCD}
                    onChange={(e) => setSoCCCD(e.target.value)}
                    style={{ width: 200, marginLeft: 10 }}
                />
                <Input
                    placeholder="Họ Tên"
                    value={hoTen}
                    onChange={(e) => setHoTen(e.target.value)}
                    style={{ width: 200, marginLeft: 10 }}
                />
                <DatePicker
                    placeholder="Ngày Sinh"
                    value={ngaySinh ? moment(ngaySinh, 'YYYY-MM-DD') : null} // Chuyển đổi ngày sang định dạng của DatePicker
                    onChange={(e, dateString) => setNgaySinh(dateString)}
                    style={{ width: 200, marginLeft: 10 }}
                />
                <Select
                    placeholder="Giới Tính"
                    value={gioiTinh}
                    onChange={(e) => setGioiTinh(e)}
                    style={{ width: 200, marginLeft: 10 }}
                >
                    <Select.Option value="Nam">Nam</Select.Option>
                    <Select.Option value="Nữ">Nữ</Select.Option>
                </Select>
                <Input
                    placeholder="Dân Tộc"
                    value={danToc}
                    onChange={(e) => setDanToc(e.target.value)}
                    style={{ width: 200, marginLeft: 10 }}
                />
                <Input
                    placeholder="Quốc Tịch"
                    value={quocTich}
                    onChange={(e) => setQuocTich(e.target.value)}
                    style={{ width: 200, marginLeft: 10 }}
                />
                <Input
                    placeholder="Quê Quán"
                    value={queQuan}
                    onChange={(e) => setQueQuan(e.target.value)}
                    style={{ width: 200, marginLeft: 10 }}
                />
                <div>
                    {/* Sử dụng react-dropzone để cho phép người dùng chọn hình ảnh */}
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Kéo và thả hoặc nhấn để chọn hình ảnh</p>
                    </div>

                    {/* Hiển thị hình ảnh đã chọn */}
                    {imageUrl && <img src={imageUrl} alt="Hình ảnh" />}
                </div>

                <Select
                    placeholder="Chọn tỉnh/thành phố"
                    value={selectedCity}
                    onChange={handleCityChange}
                    style={{ width: 200 }}
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
                    style={{ width: 200, marginLeft: 10 }}
                >
                    {districts.map((district) => (
                        <Option key={district.code} value={district.code}>
                            {district.name}
                        </Option>
                    ))}
                </Select>
                <Select
                    placeholder="Chọn phường/xã"
                    value={selectedWard}
                    onChange={handleWardChange}
                    style={{ width: 200, marginLeft: 10 }}
                >
                    {wards.map((ward) => (
                        <Option key={ward.code} value={ward.code}>
                            {ward.name}
                        </Option>
                    ))}
                </Select>
                <Input
                    placeholder="Số nhà"
                    value={houseNumber}
                    onChange={(e) => {
                        setHouseNumber(e.target.value);
                    }}
                    style={{ width: 200, marginLeft: 10 }}
                />
                <Input
                    placeholder="Tên đường"
                    value={streetName}
                    onChange={(e) => setStreetName(e.target.value)}
                    style={{ width: 200, marginLeft: 10 }}
                />
            </div>

            <h2 id="result">{result}</h2>

            <Button type="primary" onClick={handleAddAddress} style={{ marginLeft: 10 }}>
                Thêm Địa Chỉ
            </Button>
            <button onClick={() => Okk()}> ok</button>
        </div>
    );
}

export default AddCitizen;
