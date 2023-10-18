import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Input, Button } from 'antd';


function SuaTamTru() {
  const { ID } = useParams();

  const [tamTru, setTamTru] = useState(null);

  const [quanHeList, setQuanHeList] = useState([]);

  const handleQuanHeChange = (index, fieldName, value) => {
    const updatedQuanHeList = [...quanHeList];
    updatedQuanHeList[index][fieldName] = value;
    setQuanHeList(updatedQuanHeList);
  };
  
  const handleInputChange = (fieldName, value) => {
    setTamTru({
      ...tamTru,
      [fieldName]: value  
    });
  }
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

  const handleSubmit = () => {
    axios.put(`http://localhost:8000/api/suaTamTru/${ID}`, {
      HoTen: tamTru.HoTen,
      SoCCCD: tamTru.SoCCCD,
      SoDT: tamTru.SoDT,
      Email: tamTru.Email,
      DiaChi: {
        SoNha: tamTru.DiaChi.SoNha,
        TenDuong: tamTru.DiaChi.TenDuong,
        PhuongXa: tamTru.DiaChi.PhuongXa,
        QuanHuyen: tamTru.DiaChi.QuanHuyen,
        TinhThanh: tamTru.DiaChi.TinhThanh
      },
      QuanHe: quanHeList
    })
    .then(response => {
      console.log('Sửa tạm trú thành công'); 
    })
    .catch(error => {
      console.log('Lỗi sửa tạm trú', error);
    });
  }

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
    <div className='d-flex '>
      <h1>Sửa tạm trú</h1>
      
      {tamTru && (
        <div className='col-md-5'>
        
          <Input
            placeholder="Họ tên chủ hộ"
            value={tamTru.HoTen}
            onChange={e => handleInputChange('HoTen', e.target.value)}
          />
        
          <Input 
            placeholder="Số CCCD"
            value={tamTru.SoCCCD}
            onChange={e => handleInputChange('SoCCCD', e.target.value)}  
          />
        
          <Input
            placeholder="Số điện thoại"
            value={tamTru.SoDT}
            onChange={e => handleInputChange('SoDT', e.target.value)} 
          />
        
          <Input
            placeholder="Email"
            value={tamTru.Email}
            onChange={e => handleInputChange('Email', e.target.value)}
          />
        
          <Input
            placeholder="Số nhà"  
            value={tamTru.DiaChi.SoNha}
            onChange={e => handleInputChange('DiaChi', {...tamTru.DiaChi, SoNha: e.target.value})}
          />
        
          <Input
            placeholder="Tên đường"
            value={tamTru.DiaChi.TenDuong}
            onChange={e => handleInputChange('DiaChi', {...tamTru.DiaChi, TenDuong: e.target.value})}
          />
        
          <Input
            placeholder="Phường/Xã"
            value={tamTru.DiaChi.PhuongXa}
            onChange={e => handleInputChange('DiaChi', {...tamTru.DiaChi, PhuongXa: e.target.value})}  
          />
        
          <Input
            placeholder="Quận/Huyện"
            value={tamTru.DiaChi.QuanHuyen}
            onChange={e => handleInputChange('DiaChi', {...tamTru.DiaChi, QuanHuyen: e.target.value})}
          />
        
          <Input
            placeholder="Tỉnh/Thành phố"
            value={tamTru.DiaChi.TinhThanh}
            onChange={e => handleInputChange('DiaChi', {...tamTru.DiaChi, TinhThanh: e.target.value})}
          />
        
          {quanHeList.map((quanHe, index) => (
            <div key={index}>

              <Input
                placeholder="Họ và tên"
                value={quanHe.HoTen}
                onChange={e => handleQuanHeChange(index, 'HoTen', e.target.value)}
              />

              <Input
                placeholder="Số CCCD"
                value={quanHe.SoCCCD}
                onChange={e => handleQuanHeChange(index, 'SoCCCD', e.target.value)}  
              />

              <Input
                placeholder="Quan hệ chủ hộ"
                value={quanHe.QuanHeChuHo}
                onChange={e => handleQuanHeChange(index, 'QuanHeChuHo', e.target.value)}
              />
              
              <Button 
                type="primary"
                danger
                onClick={() => removeQuanHeField(index)}  
              >
                Xóa
              </Button>

            </div>
          ))}

          <Button
            type="dashed" 
            onClick={addQuanHeField}
          >
            Thêm quan hệ
          </Button>

          <Button 
            type="primary"
            onClick={handleSubmit}
          >
            Lưu thay đổi
          </Button>
        
        </div>
      )}

    </div>
  );
}

export default SuaTamTru;