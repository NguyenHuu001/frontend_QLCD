import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, Input, Button, message } from 'antd';
const { Option } = Select;

function ThemTamTru() {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [additionalIDHouse, setAdditionalIDHouse] = useState('');
  const [houseName,setNameHouse]=useState('');
  const [idCCCD,setIDCCCD]=useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [quanHeList, setQuanHeList] = useState([
    {
      HoTen: '',
      SoCCCD: '',
      QuanHeChuHo: '',
    },
  ]);
  const handleKeyDown = (e) => {
    
    if (e.key >= '0' && e.key <= '9') {
      
      setAdditionalIDHouse(additionalIDHouse + e.key);
    }
    
    e.preventDefault();
  };

  const [result, setResult] = useState('');

  const handleCityChange = (value) => {
    setSelectedCity(value);
    setSelectedDistrict('');
    setSelectedWard('');
    setDistricts([]);
    setWards([]);
    setResult('');

    axios
      .get(`https://provinces.open-api.vn/api/p/${value}?depth=2`)
      .then((response) => {
        setDistricts(response.data.districts);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách quận/huyện', error);
      });
  };

  useEffect(() => {
    axios
      .get('https://provinces.open-api.vn/api/?depth=1')
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách tỉnh/thành phố', error);
      });
  }, []);

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setSelectedWard('');
    setWards([]);
    setResult('');

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

  const handleHouseNumberChange = (e) => {
    const value = e.target.value;
    setHouseNumber(value);
    printResult();
  };

  const handleStreetNameChange = (e) => {
    const value = e.target.value;
    setStreetName(value);
    printResult();
  };

  const handleIDHouse = (e) => {
    const value = e.target.value;
    setAdditionalIDHouse(value);
  };
  const handleNameHouse=(e)=>{
    const value=e.target.value;
    setNameHouse(value);
  }
  const handelIDCCCD=(e)=>{
    const value=e.target.value;
    setIDCCCD(value);
  }
 
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleQuanHeChange = (index, fieldName, value) => {
    const updatedQuanHeList = [...quanHeList];
    updatedQuanHeList[index][fieldName] = value;
    setQuanHeList(updatedQuanHeList);
  };

  const addQuanHeField = () => {
    setQuanHeList([
      ...quanHeList,
      {
        HoTen: '',
        SoCCCD: '',
        QuanHeChuHo: '',
      },
    ]);
  };

  const removeQuanHeField = (index) => {
    const updatedQuanHeList = [...quanHeList];
    updatedQuanHeList.splice(index, 1);
    setQuanHeList(updatedQuanHeList);
  };

  const printResult = () => {
    if (selectedCity && selectedDistrict && selectedWard) {
      const cityText = cities.find((city) => city.code === selectedCity)?.name;
      const districtText = districts.find(
        (district) => district.code === selectedDistrict
      )?.name;
      const wardText = wards.find((ward) => ward.code === selectedWard)?.name;
      const resultText = `${cityText} | ${districtText} | ${wardText}`;

      const fullAddress = `${houseNumber} ${streetName} ${resultText}`;
      setResult(fullAddress);
    }
  };

  const handleSubmit = () => {
    const dataToSend = {
      ID: houseNumber,
      TenChuHo: houseName,
      SoCCCD: idCCCD,
      SoDT: phoneNumber,
      Email: email,
      DiaChi:{
        SoNha: houseNumber,
        TenDuong: streetName,
        PhuongXa: selectedWard,
        QuanHuyen: selectedDistrict,
        TinhThanh: selectedCity,
    },
      QuanHe: quanHeList,
      
    };

    axios.post('http://localhost:8000/api/themTamTru', dataToSend)
            .then((response) => {
                // Xử lý kết quả từ máy chủ, ví dụ: hiển thị thông báo thành công
                alert('Đã thêm tạm trú thành công!');
            })
            .catch((error) => {
                // Xử lý lỗi từ máy chủ, ví dụ: hiển thị thông báo lỗi
                console.error('Lỗi khi thêm tạm trú', error);
            });

   
  };

  return (
    <div className="container mt-4 p-0">
      <div>
      <Input
          placeholder="ID Hộ khẩu"
          value={additionalIDHouse}
          onKeyDown={handleKeyDown}
          style={{ width: 200, marginLeft: 10 }}
        />
        <Input
          placeholder="Họ tên chủ hộ"
          value={houseName}
          onChange={handleNameHouse}
          style={{ width: 200, marginLeft: 10 }}
        />
        <Input
          placeholder="Số căn cước công dân"
          value={idCCCD}
          onChange={handelIDCCCD}
          style={{ width: 200, marginLeft: 10 }}
        />
        <Input
          placeholder="Số điện thoại"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          style={{ width: 200, marginLeft: 10 }}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          style={{ width: 200, marginLeft: 10 }}
        />
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
          onChange={handleHouseNumberChange}
          style={{ width: 200, marginLeft: 10 }}
        />
        <Input
          placeholder="Tên đường"
          value={streetName}
          onChange={handleStreetNameChange}
          style={{ width: 200, marginLeft: 10 }}
        />
       
      </div>

      <div>
        <h3>Thông tin QuanHe</h3>
        {quanHeList.map((quanHe, index) => (
          <div key={index}>
            <Input
              placeholder="Họ và tên"
              value={quanHe.HoTen}
              onChange={(e) =>
                handleQuanHeChange(index, 'HoTen', e.target.value)
              }
              style={{ width: 200, marginRight: 10 }}
            />
            <Input
              placeholder="Số CCCD"
              value={quanHe.SoCCCD}
              onChange={(e) =>
                handleQuanHeChange(index, 'SoCCCD', e.target.value)
              }
              style={{ width: 200, marginRight: 10 }}
            />
            <Input
              placeholder="QuanHeChuHo"
              value={quanHe.QuanHeChuHo}
              onChange={(e) =>
                handleQuanHeChange(index, 'QuanHeChuHo', e.target.value)
              }
              style={{ width: 200, marginRight: 10 }}
            />
            <Button
              type="primary"
              onClick={() => removeQuanHeField(index)}
              danger
            >
              Remove
            </Button>
          </div>
        ))}
        <Button type="dashed" onClick={addQuanHeField}>
          Add QuanHe
        </Button>
      </div>

      <Button type="primary" onClick={handleSubmit} style={{ marginTop: 10 }}>
        Submit
      </Button>

      <h2 id="result">{result}</h2>
    </div>
  );
}

export default ThemTamTru;
