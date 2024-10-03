import { useState } from 'react';
import PropTypes from 'prop-types';  
import './ReceiptPopup.css';

const ReceiptPopup = ({ person, onClose, receipts }) => {
    const [currentReceiptIndex, setCurrentReceiptIndex] = useState(0);

    const handleReceiptChange = (index) => {
        setCurrentReceiptIndex(index);
    };

    const currentReceipt = receipts[currentReceiptIndex];

    return (
        <div className="popup">
            <div className="popup-outer-box">
                <div className="receipt-navigation">
                    {receipts.map((_, index) => (
                        <button 
                            key={index}
                            onClick={() => handleReceiptChange(index)}
                            className={`receipt-button ${currentReceiptIndex === index ? 'active' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <h3 className="person-info">
                    {person.name}님은 총 {person.amount.toLocaleString()}원<br></br> 개인 비용이 청구되셨습니다.
                </h3>
                
                <div className="popup-inner-box">
                    <p>매장명: {currentReceipt.storeName}</p>
                    <p>날짜: {currentReceipt.date}</p>
                    <table className="receipt-table">
                        <thead>
                            <tr>
                                <th>상품명</th>
                                <th>단가</th>
                                <th>수량</th>
                                <th>금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentReceipt.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.price.toLocaleString()}원</td>
                                    <td>{item.quantity}</td>
                                    <td>{(item.price * item.quantity).toLocaleString()}원</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h4 className="amount-h4">
                        <span className="label">총액</span> {person.amount.toLocaleString()}원
                    </h4>
                </div>

                <button className="button-close" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

// PropTypes 정의
ReceiptPopup.propTypes = {
    person: PropTypes.shape({
        name: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    receipts: PropTypes.arrayOf(
        PropTypes.shape({
            storeName: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    price: PropTypes.number.isRequired,
                    quantity: PropTypes.number.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
};

export default ReceiptPopup;
