import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Receipt from "../components/Receipt";
import Footer from "../components/Footer";
import './MainPage.css';
import axios from "axios";

const MainPage = () => {
    const [count, setCount] = useState(0);
    const [roomName, setRoomName] = useState('');
    const [userName, setUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const handleStartCalculation = async () => {
        if (roomName.trim() === '' || userName.trim() === '') {
            setErrorMessage('정산방 이름과 이름을 입력해주세요.');
        } else {
            setErrorMessage('');
            try {
                // 현재 시간을 기준으로 roomId 생성
                const roomId = Date.now();

                // 방 생성 API 호출
                const response = await fetch('http://localhost:8080/api/room', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ roomId, roomName, leader: userName, memberCount: count }),
                });

                if (!response.ok) {
                    throw new Error('방 생성에 실패했습니다.');
                }

                

                const roomData = await response.json();
                console.log("Room created:", roomData);

                localStorage.setItem('userName', userName); // 로컬 스토리지에 이름 저장

    
                navigate(`/upload/${roomId}`);  // 방 생성 후 roomId를 포함한 경로로 이동
            } catch (error) {
                console.error('작업 실패:', error);
                setErrorMessage('작업 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <Receipt explanation="더 쉽게 정산하세요! 영수증만 올리면 자동으로 계산해 드립니다.">
            <div className="counter-container">
                <div className="counter-box">
                    <p>{count}</p>
                </div>
                <div className="button-container">
                    <button className="count-button" onClick={handleIncrement}>+</button>
                    <button className="count-button" onClick={handleDecrement}>-</button>
                </div>
            </div>
            <div className='start-container'>
                <input
                    className='input-box'
                    placeholder="정산방 이름을 작성해주세요"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />
                <input
                    className='input-box'
                    placeholder="이름을 입력하세요"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button className='button-start' onClick={handleStartCalculation}>정산시작하기</button>
            </div>
            <Footer />
        </Receipt>
    );
};

export default MainPage;
