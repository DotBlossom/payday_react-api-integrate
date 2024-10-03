import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReceipts } from "../context/ReceiptContext"; // ReceiptContext에서 데이터 가져오기
import Receipt from "../components/Receipt";
import UploadImage from "../components/UploadImage";
import "./UploadPage.css";

import { ReceiptContext } from "../context/ReceiptContext";

const UploadPage = () => {
    const { roomId } = useParams();
    const { currentRoom, fetchRoomDataFromServer, loading } = useReceipts(); // loading 상태 추가
    const navigate = useNavigate();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]); // 업로드된 이미지 상태 관리

    let imageUrlsArray = [];

    const { setImageUrl, setReceiptNumber, getPredictData} = useContext(ReceiptContext);


    // 방 정보가 없고 로딩이 되지 않은 경우에만 데이터 요청
    useEffect(() => {
        if (!currentRoom && !loading && roomId) {
            fetchRoomDataFromServer(roomId);
        }
    }, [currentRoom, loading, roomId, fetchRoomDataFromServer]);

    if (!currentRoom) {
        return <p>Loading room data...</p>;
    }

    // 이미지 선택 시 호출되는 핸들러
    const handleImageChange = (images) => {
        setSelectedImages(images);
    };

    // 이미지 업로드 핸들러
    const handleImageUpload = async () => {
        if (selectedImages.length === 0) {
            console.error("이미지를 선택해주세요.");
            return;
        }

        try {
            const formData = new FormData();
            selectedImages.forEach((image) => {
                formData.append("image", image.file);
            });

            const response = await fetch(`http://localhost:5001/flaskapi/upload/${roomId}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("이미지 업로드 실패");
            }

            const result = await response.json();
            console.log("업로드된 이미지 URL: ", result.imageUrl);
            
            //console.log(typeof(result.imageUrl))
            
            setIsPopupVisible(true);
            
            setImageUrl(result.imageUrl);
            
      
 
            // context에 predictdata setting
            setReceiptNumber(selectedImages.length);
            

        } catch (error) {
            console.error("이미지 업로드 오류: ", error);
        }
    };

    // 팝업 확인 버튼 핸들러
    const handlePopupConfirm = () => {
        setIsPopupVisible(false);

        getPredictData(imageUrlsArray);
        navigate(`/room/${roomId}`, { state: { images: selectedImages.map((data) => data.dataUrl) } });
    };

    // 팝업 닫기 버튼 핸들러
    const handlePopupClose = () => {
        setIsPopupVisible(false);
    };

    return (
        <div>
            <Receipt explanation="영수증을 올려주세요.">
                <UploadImage onImagesChange={handleImageChange} />
                <button className="button-mini" onClick={handleImageUpload}>
                    정산 하러가기
                </button>

                {isPopupVisible && (
                    <div className="popup-overlay">
                        <div className="popup-container">
                            <button className="popup-close-button" onClick={handlePopupClose}>
                                &times;
                            </button>
                            <p className="popup-p">이미지가 업로드되었습니다.</p>
                            <button className="popup-confirm-button" onClick={handlePopupConfirm}>
                                확인
                            </button>
                        </div>
                    </div>
                )}
            </Receipt>
        </div>
    );
};

export default UploadPage;
