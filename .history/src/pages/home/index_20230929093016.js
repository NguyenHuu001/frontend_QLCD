function Home() {
    return (
        <div className="container mt-4 p-0">
            <div className="d-flex ">
                <div className="col-md-1" style={{ borderRight: '2px solid black', textAlign:'center' }}>
                    STT
                </div>
                <div className="col-md-2" style={{ borderRight: '2px solid black', textAlign:'center' }}>
                    Họ Tên
                </div>
                <div className="col-md-1" style={{ borderRight: '2px solid black', textAlign:'center' }}>
                    Năm sinh
                </div>
                <div className="col-md-1" style={{ borderRight: '2px solid black', textAlign:'center' }}>
                    Giới tính
                </div>
                <div className="col-md-2" style={{ borderRight: '2px solid black', textAlign:'center' }}>
                    Số CCCD
                </div>
                <div className="col-md-4">Địa chỉ thường trú</div>
            </div>
        </div>
    );
}

export default Home;
