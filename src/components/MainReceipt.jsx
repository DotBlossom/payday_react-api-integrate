import { useState } from "react";
import PropTypes from "prop-types";
import EditModal from "./EditModal";

const MainReceipt = ({ receiptItems, onItemSelect, onItemSave, receiptData }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const handleSelectItem = (item) => {
        if (item.quantity > 0) {
            onItemSelect(item); // Notify parent to update the selected item
        } else {
            alert("이 항목은 더 이상 선택할 수 없습니다.");
        }
    };

    const openEditModal = (item, index) => {
        setEditItem({ ...item, index });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditItem(null); 
    };
    

    const handleSave = () => {
        const updatedItem = { ...editItem }; // Make a copy of the edited item
        onItemSave(updatedItem); // Call the save handler passed from the parent, which will update the state in the parent
        closeEditModal();
    };

    const handleChange = (e, field) => {
        const value = field === "price" || field === "quantity" ? Number(e.target.value) : e.target.value;
        setEditItem((prevItem) => ({
            ...prevItem,
            [field]: value,
        }));
    };

    const totalReceiptAmount = receiptItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="receipt-block">
            <div className="receipt-header">
                <h2>{receiptData.storeName}</h2>
                <p>{receiptData.date}</p>
                <p>{receiptData.address}</p>
            </div>
            <div className="receipt-content">
                <table>
                    <thead>
                        <tr>
                            <th>상품명</th>
                            <th>단가</th>
                            <th>수량</th>
                            <th>금액</th>
                            <th>수정</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receiptItems && receiptItems.length > 0 ? (
                            receiptItems.map((item, index) => (
                                <tr key={index} onClick={() => handleSelectItem(item)}>
                                    <td>{item.name}</td>
                                    <td>{item.price.toLocaleString()}</td>
                                    <td>{item.quantity}</td>
                                    <td>{(item.price * item.quantity).toLocaleString()}</td>
                                    <td>
                                        <button
                                            className="edit-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openEditModal(item, index);
                                            }}
                                        >
                                            edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No items available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="receipt-total">총 금액: {totalReceiptAmount.toLocaleString()}원</div>
            </div>
            {isEditModalOpen && (
                <EditModal
                    editItem={editItem}
                    handleSave={handleSave}
                    handleChange={handleChange}
                    closeEditModal={closeEditModal}
                />
            )}
        </div>
    );
};

MainReceipt.propTypes = {
    receiptItems: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired,
        })
    ).isRequired,
    onItemSelect: PropTypes.func.isRequired,
    onItemSave: PropTypes.func.isRequired, 
    receiptData: PropTypes.shape({
        storeName: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
    }).isRequired,
};

export default MainReceipt;
