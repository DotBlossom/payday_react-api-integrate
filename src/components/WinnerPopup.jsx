import PropTypes from 'prop-types';
import './WinnerPopup.css';

const Popup = ({ winner, onClose }) => {
    return (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-button" onClick={onClose}>X</button>
                <h3 className="popup-imo">🎉</h3>
                <h3 className="popup-title">축하합니다! <br></br>{winner.name}님이 당첨되셨습니다.</h3>
                <p className="remaining-amount-message">
                    남은 금액 <span className="amount">{winner.remainingAmount.toLocaleString()}원</span>을 <br></br> 추가로 내주세요!
                </p>
            </div>
        </div>
    );
};

Popup.propTypes = {
    winner: PropTypes.shape({
        name: PropTypes.string.isRequired,
        remainingAmount: PropTypes.number.isRequired
    }).isRequired,
    onClose: PropTypes.func.isRequired
};


export default Popup;
