import logo from '../../assets/imgs/avatar.png';
function Citizendetails() {
    return (
        <div className="container">
            <div className='col-md-3 d-flex flex-column'>
                <div className='d-flex justify-content-center'>
                    <img className='col-md-6' src={logo} alt='vaater' style={{borderRadius:'50%'}}/>
                </div>
                <span className='mt-3 mb-3'>Họ tên: <b>Nguyễn Đức Hữu</b></span>
                <span>Giới tính: <b>Nam</b></span>
            </div>
        </div>
    );
}

export default Citizendetails;
