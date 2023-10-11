import { Select, Input, Modal } from 'antd'; // Import Modal from 'antd'
import React, { useState } from 'react';
import { getAllTT, deleteTT } from '../../services/qlcd_services'; // Import deleteTT API function
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function TamTru() {
    const [dctt, setDCTT] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control the delete confirmation modal
    const [selectedItemId, setSelectedItemId] = useState(null); // State to store the ID of the selected item to delete

    useEffect(() => {
        getALLTamTru();
    }, []);

    const getALLTamTru = async () => {
        try {
            const response = await getAllTT().then((res) => {
                setDCTT(res);
            });
        } catch (error) {
            console.log('Lỗi');
        }
    };

    const handleDeleteClick = (itemId) => {
        // When the delete button is clicked, set the selected item's ID and show the confirmation modal
        setSelectedItemId(itemId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        // Call the API to delete the selected item based on selectedItemId
        try {
            await deleteTT(selectedItemId); // Replace deleteTT with your actual delete API function
            // After successful deletion, refresh the list or update the state as needed
            getALLTamTru();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
        // Close the confirmation modal
        setShowDeleteModal(false);
    };

    return (
        <div className="container mt-4 p-0">
            <Link to={`/themtamtru`} className="btn_add">
                Thêm tạm trú
            </Link>
            <div className="d-flex justify-content-between"></div>
            <div className="d-flex mt-4 title_table">{/* ... your existing code ... */}</div>
            {dctt &&
                dctt.map((item, index) => (
                    <div className="d-flex mt-3 no-wrap align-items-center" key={item._id}>
                        <div className="col-md-1 item">{index + 1}</div>
                        <div className="col-md-1 item">{item.ID}</div>
                        <div className="col-md-2 item">{item.HoTen}</div>
                        <div className="col-md-1 item">{item.SoCCCD}</div>
                        <Link to={`/suatamtru/${item.ID}`} className="btn_update">
                            Sửa
                        </Link>
                        <Link to={`/xemtamtru/${item.ID}`} className="btn_detail">
                            Xem chi tiết
                        </Link>
                        <button className="btn_delete" onClick={() => handleDeleteClick(item._id)}>
                            Xóa
                        </button>
                    </div>
                ))}
            {/* Delete confirmation modal */}
            <Modal
                title="Xác nhận xóa"
                visible={showDeleteModal}
                onOk={handleConfirmDelete}
                onCancel={() => setShowDeleteModal(false)}
            >
                Bạn có chắc chắn muốn xóa?
            </Modal>
        </div>
    );
}

export default TamTru;
