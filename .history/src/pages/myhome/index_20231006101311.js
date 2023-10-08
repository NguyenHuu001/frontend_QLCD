import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyHome() {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    useEffect(() => {
        callAPI('https://provinces.open-api.vn/api/?depth=1', 'cities');
    }, []);

    const callAPI = (api, target) => {
        axios
            .get(api)
            .then((response) => {
                renderData(response.data, target);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const renderData = (data, target) => {
        let options = [{ code: '', name: 'Chọn' }];

        if (data) {
            options = options.concat(data.map((element) => ({ code: element.code, name: element.name })));
        }

        switch (target) {
            case 'cities':
                setCities(options);
                break;
            case 'districts':
                setDistricts(options);
                break;
            case 'wards':
                setWards(options);
                break;
            default:
                break;
        }
    };

    const handleCityChange = (event) => {
        const selectedCity = event.target.value;
        setSelectedCity(selectedCity);
        callAPI(`https://provinces.open-api.vn/api/p/${selectedCity}?depth=2`, 'districts');
    };

    const handleDistrictChange = (event) => {
        const selectedDistrict = event.target.value;
        setSelectedDistrict(selectedDistrict);
        callAPI(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`, 'wards');
    };

    const handleWardChange = (event) => {
        const selectedWard = event.target.value;
        setSelectedWard(selectedWard);
    };

    return (
        <div>
            <div>
                <select id="city" onChange={handleCityChange} value={selectedCity}>
                    {cities.map((city) => (
                        <option key={city.code} value={city.code}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <select id="district" onChange={handleDistrictChange} value={selectedDistrict}>
                    {districts.map((district) => (
                        <option key={district.code} value={district.code}>
                            {district.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <select id="ward" onChange={handleWardChange} value={selectedWard}>
                    {wards.map((ward) => (
                        <option key={ward.code} value={ward.code}>
                            {ward.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <h2>{`${selectedCity} | ${selectedDistrict} | ${selectedWard}`}</h2>
            </div>
        </div>
    );
}

export default MyHome;
