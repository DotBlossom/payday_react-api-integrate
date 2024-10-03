import { useRef, useEffect } from "react";
import PropTypes from "prop-types"; // prop-types 추가

const EditModal = ({ editItem, handleSave, handleChange, closeEditModal }) => {
    const nameInputRef = useRef(null);
    const priceInputRef = useRef(null);
    const quantityInputRef = useRef(null);

    // Focus the price input if it's valid; otherwise, focus the name input
    useEffect(() => {
        if (editItem.name === "" && nameInputRef.current) {
            nameInputRef.current.focus();
        } else if (priceInputRef.current) {
            priceInputRef.current.focus();
        }
    }, [editItem]);

    const handleInputChange = (e, field) => {
        const value = field === "price" || field === "quantity" ? Number(e.target.value) : e.target.value;
        handleChange(e, field);
    };

    if (!editItem) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>항목 수정</h3>
                <div>
                    <label>상품명: </label>
                    <input type="text" value={editItem.name || ""} onChange={(e) => handleInputChange(e, "name")} ref={nameInputRef} placeholder="상품명을 입력하세요" />
                </div>
                <div>
                    <label>단가: </label>
                    <input
                        type="number"
                        value={editItem.price || 0}
                        onChange={(e) => handleInputChange(e, "price")}
                        ref={priceInputRef}
                        min={0} // Prevent negative price
                    />
                </div>
                <div>
                    <label>수량: </label>
                    <input
                        type="number"
                        value={editItem.quantity || 0}
                        onChange={(e) => handleInputChange(e, "quantity")}
                        ref={quantityInputRef}
                        min={1} // Prevent negative quantity, ensure at least 1
                    />
                </div>
                <div className="modal-actions">
                    <button onClick={handleSave}>저장</button>
                    <button onClick={closeEditModal}>취소</button>
                </div>
            </div>
        </div>
    );
};

// PropTypes 검증 추가
EditModal.propTypes = {
    editItem: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
    }),
    handleSave: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    closeEditModal: PropTypes.func.isRequired,
};

export default EditModal;
