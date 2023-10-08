import logo from '../../assets/imgs/avatar.png';
import './citizendetails.scss';
import { getOneCD, searchCCCD } from '../../services/qlcd_services';
import { useEffect, useState } from 'react';
function Citizendetails() {
    const cccd = localStorage.getItem('CCCD');

    const [citizen, setCitizen] = useState([]);
    const [adressTamT, setAdressTamT] = useState([]);
    const [adressTTru, setAdressTTru] = useState([]);

    useEffect(() => {
        getCD();
    }, []);

    const getCD = async () => {
        try {
            const response = await searchCCCD(cccd).then((res) => {
                setCitizen(res);
                console.log(res);
            });
        } catch (error) {
            console.log('lỗi');
        }
    };
    return (
        <div className="container mt-5">
            <div className="d-flex flex-wrap">
                {citizen.length > 0 &&
                    citizen.map((item, index) => (
                        <div className="col-md-3 d-flex flex-column" key={index}>
                            <div className="ms-4">
                                <img className="col-md-6 avatar_img" src={logo} alt="vaater" />
                            </div>
                            <span className="mt-3 mb-3">
                                Họ tên: <b>{item.HoTen}</b>
                            </span>
                            <span>
                                Giới tính: <b>{item.GioiTinh}</b>
                            </span>
                        </div>
                    ))}

                
            </div>
        </div>
    );
}

export default Citizendetails;
