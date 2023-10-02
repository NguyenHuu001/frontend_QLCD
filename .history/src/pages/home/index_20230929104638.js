import './home.scss'
import { Select, Space } from 'antd';
function Home() {
    return (
        <div className="container mt-4 p-0">
            <div>
                <span>Sắp xếp:</span>

            </div>
            <div className="d-flex mt-4">
                <div className="col-md-1 item">STT</div>
                <div className="col-md-2 item">Họ Tên</div>
                <div className="col-md-1 item">Năm sinh</div>
                <div className="col-md-1 item">Giới tính</div>
                <div className="col-md-1 item">Số CCCD</div>
                <div className="col-md-3 item">Địa chỉ thường trú</div>
            </div>
            <div className="d-flex mt-3 no-wrap align-items-center">
                <div className="col-md-1 item">1</div>
                <div className="col-md-2 item">Nguyễn Đức Hữu</div>
                <div className="col-md-1 item">11/11/2002</div>
                <div className="col-md-1 item">Nam</div>
                <div className="col-md-1 item">1234567890</div>
                <div className="col-md-3 item">Thôn Minh Đức, Xã Hòa Kiến, Tp.Tuy Hòa, Tỉnh Phú Yên sssssssssssssss</div>
                <button className='btn_detail'>Xem chi tiết</button>
                <button className='btn_update'>Sửa</button>
                <button className='btn_delete'>Xóa</button>
            </div>
        </div>
    );
}

export default Home;
