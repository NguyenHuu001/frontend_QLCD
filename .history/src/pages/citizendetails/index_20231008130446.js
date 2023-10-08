import logo from '../../assets/imgs/avatar.png';
function Citizendetails() {
    return (
        <div className="container">
            <div className='col-md-3 d-flex flex-column'>
                <div >
                    <img src={logo} alt='vaater' />
                </div>
                <span className='mt-3 mb-3'>Họ tên: <b>Nguyễn Đức Hữu</b></span>
                <span>Giới tính: <b>Nam</b></span>
            </div>
        </div>
    );
}

export default Citizendetails;
