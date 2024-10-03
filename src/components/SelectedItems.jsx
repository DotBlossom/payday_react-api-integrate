import PropTypes from "prop-types";

const SelectedItems = ({ selectedItems, totalAmount, onRemoveItem }) => (
    <div className="selected-items">
        <h4>내가 선택한 항목</h4>
        {selectedItems.length === 0 && <h5>영수증 항목을 클릭하여 선택</h5>}
        <ul>
            {selectedItems.map((item, index) => (
                <li key={index} onClick={() => onRemoveItem(index)}>
                    {/* Conditional rendering to avoid undefined values */}
                    {item?.name && item?.price && item?.quantity ? (
                        <>
                            {item.name} - {item.price.toLocaleString()}원 x {item.quantity}개
                        </>
                    ) : (
                        <span>Invalid item</span>
                    )}
                </li>
            ))}
        </ul>
        {selectedItems.length > 0 && <h4>총 금액: {totalAmount.toLocaleString()}원</h4>}
    </div>
);

// PropTypes validation
SelectedItems.propTypes = {
    selectedItems: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired,
        })
    ).isRequired,
    totalAmount: PropTypes.number.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
};

export default SelectedItems;
