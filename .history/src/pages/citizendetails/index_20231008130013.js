import logo from '../../assets/imgs/avatar.png';
function Citizendetails() {
    return (
        <div className="container-fluid">
            <div className='col-md-3' className>
                <div className='col-md-4'>
                    <img src={logo} alt='vaater' />
                </div>
                <span>Họ tên: </span>
                <span>Giới tính: </span>
            </div>
        </div>
    );
}

export default Citizendetails;
