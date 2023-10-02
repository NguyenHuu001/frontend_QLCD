function Home() {
    return (
        <div className="container mt-4 p-0">
            <div className="d-flex ">
                <div className="col-md-1" style={{ borderRight: '2px solid black' }}>
                    STT
                </div>
                <div className="col-md-2" style={{ borderRight: '2px solid black' }}>
                    Họ Tên
                </div>
                <div className="col-md-1" style={{ borderRight: '2px solid black' }}>
                    Năm sinh
                </div>
                <div className="col-md-1" style={{ borderRight: '2px solid black' }}>
                    Giới tính
                </div>
                <div className="col-md-2" style={{ borderRight: '2px solid black' }}>
                    Số CCCD
                </div>
                <div className="col-md-4">Địa chỉ thường trú</div>
            </div>
        </div>
    );
}

export default Home;
