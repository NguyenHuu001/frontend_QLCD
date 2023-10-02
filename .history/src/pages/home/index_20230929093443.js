import './home.scss'
function Home() {
    return (
        <div className="container mt-4 p-0">
            <div className="d-flex ">
                <div className="col-md-1 item">STT</div>
                <div className="col-md-2 item">Họ Tên</div>
                <div className="col-md-1 item">Năm sinh</div>
                <div className="col-md-1 item">Giới tính</div>
                <div className="col-md-2 item">Số CCCD</div>
                <div className="col-md-4 item">Địa chỉ thường trú</div>
            </div>
            <div className="d-flex mt-3">
                <div className="col-md-1 item">1</div>
                <div className="col-md-2 item">Nguyễn Đức Hữu</div>
                <div className="col-md-1 item">11/11/2002</div>
                <div className="col-md-1 item">Nam</div>
                <div className="col-md-2 item">123456789</div>
                <div className="col-md-4 item">Địa chỉ thường trú</div>
            </div>
        </div>
    );
}

export default Home;
