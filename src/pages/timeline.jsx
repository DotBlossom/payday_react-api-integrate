import { useState, useEffect } from "react";
import receipt1 from "../assets/영수증_예시1.png";
import receipt2 from "../assets/영수증_예시2.png";
import receipt3 from "../assets/영수증_예시3.png";
import "./timeline.css";

const receiptData = [
    {
        image: receipt1,
        storeName: "단토리",
        date: "2024/06/19 19:08",
        address: "서울 강서구 공항대로 247",
        items: [
            { name: "공깃밥", price: 3000, quantity: 3 },
            { name: "코크 하이볼", price: 3900, quantity: 1 },
            { name: "토마토 하이볼", price: 5900, quantity: 1 },
            { name: "파인애플 하이볼", price: 10900, quantity: 1 },
            { name: "명란계란말이", price: 6900, quantity: 1 },
            { name: "아기소바", price: 8900, quantity: 1 },
        ],
        mapCoords: { lat: 37.5585, lng: 126.8375 },
    },
    {
        image: receipt2,
        storeName: "초밥천국",
        date: "2024/06/15 18:45",
        address: "서울 마포구 양화로 123",
        items: [
            { name: "초밥 세트", price: 15000, quantity: 2 },
            { name: "사케", price: 12000, quantity: 1 },
            { name: "우동", price: 7000, quantity: 1 },
            { name: "튀김", price: 8000, quantity: 1 },
        ],
        mapCoords: { lat: 37.5547, lng: 126.9138 },
    },
    {
        image: receipt3,
        storeName: "치킨마을",
        date: "2024/07/01 20:30",
        address: "서울 강남구 테헤란로 45",
        items: [
            { name: "치킨", price: 18000, quantity: 1 },
            { name: "맥주", price: 4000, quantity: 2 },
            { name: "감자튀김", price: 5000, quantity: 1 },
        ],
        mapCoords: { lat: 37.5091, lng: 127.0628 },
    },
];

const Timeline = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [mapHtml, setMapHtml] = useState("");

    const fetchMap = async (selectedIndex) => {
        try {
            const response = await fetch("http://127.0.0.1:5001/geo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    addresses: receiptData.map(receipt => receipt.address),
                    storeNames: receiptData.map(receipt => receipt.storeName),
                    selectedIndex: selectedIndex
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                setMapHtml(data.map_html);
            } else {
                console.error("Server response error:", response.statusText);
            }
        } catch (error) {
            console.error("지도를 가져오는 동안 오류가 발생했습니다:", error);
        }
    };
    
    

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        fetchMap(index); 
    };

    useEffect(() => {
        fetchMap(0);
    }, []);

    return (
        <div className="timeline-page">
            <div className="header-section">
                <div className="title">PayDay</div>
                <div className="image-preview-list">
                    {receiptData.map((receipt, index) => (
                        <img
                            key={index}
                            src={receipt.image}
                            onClick={() => handleImageClick(index)}
                            className={`preview-image ${
                                currentImageIndex === index ? "selected" : ""
                            }`}
                        />
                    ))}
                </div>
            </div>

            <div className="map-section">
                <div className="map-block">
                    {mapHtml ? (
                        <div
                            className="map-placeholder"
                            dangerouslySetInnerHTML={{ __html: mapHtml }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    ) : (
                        <p>지도를 불러오는 중입니다...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
