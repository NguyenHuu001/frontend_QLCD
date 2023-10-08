import logo from '../../assets/imgs/avatar.png';
function Citizendetails() {
    return (
        <div className="container-fluid">
            <div className='col-md-3 d-flex flex-column'>
                <div className='col-md-4'>
                    <img src={logo} alt='vaater' />
                </div>
                <span className='mt-3 mb-3'>Họ tên: <b></b></span>
                <span>Giới tính: </span>
            </div>
        </div>
    );
}

export default Citizendetails;
