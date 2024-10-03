import { FiX } from "react-icons/fi"; // Close icon from react-icons

const ImageModal = ({ src, onClose }) => (
    <div className="modal-overlay">
        <div className="img-modal-content">
            <button className="close-icon" onClick={onClose}>
                <FiX size={24} />
            </button>
            <h3>인식이 잘 되었나요?</h3>
            <img src={src} alt="영수증 이미지" />
        </div>
    </div>
);

export default ImageModal;
