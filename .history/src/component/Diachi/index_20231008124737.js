import axios from 'axios';
import $ from 'jquery';

import { Select, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { getAllCD, getAllDC, sortName, sortBirth, searchCCCD, searchName } from '../../services/qlcd_services';

const { Search } = Input;

function AddressSelect() {
    const [congDan, setCongDan] = useState([]);
    const [dctt, setDctt] = useState({});
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    useEffect(() => {
        getDiaChiAll();
        getAllCongDan();
    }, []);

    const getAllCongDan = async () => {
        try {
            const response = await getAllCD();
            setCongDan(response);
        } catch (error) {
            console.log('LỖi');
        }
    };

    const getDiaChi = (id) => {
        const matchedItem = dctt[id];
        if (matchedItem) {
            return (
                '' +
                matchedItem.SoNha +
                ' ' +
                matchedItem.TenDuong +
                ' ' +
                matchedItem.PhuongXa +
                ' ' +
                matchedItem.QuanHuyen +
                ' ' +
                matchedItem.TinhThanh
            );
        }
        return 'Chưa Có Địa Chỉ';
    };

    const getDiaChiAll = async () => {
        try {
            const response = await getAllDC();
            setDctt(response);
        } catch (error) {
            console.log('Lỗi');
        }
    };

    const sortWithName = async () => {
        try {
            const response = await sortName();
            setCongDan(response);
        } catch (error) {
            console.log('Lỗi');
        }
    };

    const sortWithBirth = async () => {
        try {
            const response = await sortBirth();
            setCongDan(response);
        } catch (error) {
            console.log('Lỗi');
        }
    };

    const handleChange = (value) => {
        if (value === 1) {
            sortWithName();
        } else {
            sortWithBirth();
        }
    };

    const onSearchCCCD = async (value) => {
        try {
            const response = await searchCCCD(value);
            setCongDan(response);
        } catch (error) {
            console.log('Lỗi');
        }
    };

    const onSearchName = async (value) => {
        try {
            const response = await searchName(value);
            setCongDan(response);
        } catch (error) {
            console.log('Lỗi');
        }
    };

    // const handleCityChange = (value) => {
    //     setSelectedCity(value);
    //     setSelectedDistrict('');
    //     setSelectedWard('');
    // };

    // const handleDistrictChange = (value) => {
    //     setSelectedDistrict(value);
    //     setSelectedWard('');
    // };

    // const handleWardChange = (value) => {
    //     setSelectedWard(value);
    // };
    useEffect(() => {
        // Đoạn mã JavaScript đã cung cấp
        const host = 'https://provinces.open-api.vn/api/';

        var callAPI = (api) => {
            return axios.get(api).then((response) => {
                renderData(response.data, 'city');
            });
        };

        callAPI('https://provinces.open-api.vn/api/?depth=1');

        var callApiDistrict = (api) => {
            return axios.get(api).then((response) => {
                renderData(response.data.districts, 'district');
            });
        };

        var callApiWard = (api) => {
            return axios.get(api).then((response) => {
                renderData(response.data.wards, 'ward');
            });
        };

        var renderData = (array, select) => {
            let row = ' <option disable value="">Chọn</option>';
            array.forEach((element) => {
                row += `<option data-id="${element.code}" value="${element.name}">${element.name}</option>`;
            });
            document.querySelector('#' + select).innerHTML = row;
        };

        $('#city').change(() => {
            callApiDistrict(host + 'p/' + $('#city').find(':selected').data('id') + '?depth=2');
            printResult();
        });

        $('#district').change(() => {
            callApiWard(host + 'd/' + $('#district').find(':selected').data('id') + '?depth=2');
            printResult();
        });

        $('#ward').change(() => {
            printResult();
        });

        var printResult = () => {
            if (
                $('#district').find(':selected').data('id') != '' &&
                $('#city').find(':selected').data('id') != '' &&
                $('#ward').find(':selected').data('id') != ''
            ) {
                let result =
                    $('#city option:selected').text() +
                    ' | ' +
                    $('#district option:selected').text() +
                    ' | ' +
                    $('#ward option:selected').text();
                $('#result').text(result);
            }
        };
    }, []); // Thêm [] để đảm bảo useEffect chỉ chạy một lần khi component được render

    return (
        <div className="container mt-4 p-0">
            <div>
                <select id="city">
                    <option value="" selected>
                        Chọn tỉnh thành
                    </option>
                </select>
                <select id="district">
                    <option value="" selected>
                        Chọn quận huyện
                    </option>
                </select>
                <select id="ward">
                    <option value="" selected>
                        Chọn phường xã
                    </option>
                </select>
            </div>

            <h2 id="result"></h2>
        </div>
    );
}

export default AddressSelect;
