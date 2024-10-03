import Receipt from "../components/Receipt"; 
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from "../components/Footer";
import { useReceipts } from '../context/ReceiptContext';  // context를 업데이트하기 위한 함수
import './EnterUserPage.css';

const EnterUserPage = () => {
    const { roomId } = useParams();  // roomId를 URL에서 가져옴
    const { fetchRoomDataFromServer, currentRoom, updateRoomMembers } = useReceipts();  // 방 정보를 업데이트하기 위한 함수
    const [userName, setUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // 방 정보를 서버로부터 받아오는 함수 (context에서 관리)
        const loadRoomData = async () => {
            if (roomId && !currentRoom) {
                await fetchRoomDataFromServer(roomId);
            }
        };
        loadRoomData();
    }, [roomId, fetchRoomDataFromServer, currentRoom]);


    const handleStartCalculation = async () => {
        if (userName.trim() === '') {
            setErrorMessage('이름을 입력해주세요.');
        } else {
            setErrorMessage('');
            localStorage.setItem('userName', userName); // LocalStorage에 이름 저장

            try {
                // context 함수를 호출하여 멤버 추가
                await updateRoomMembers(roomId, userName);
                navigate(`/room/${roomId}`); // 멤버 추가 후 방 페이지로 이동
            } catch {
                setErrorMessage('멤버를 추가하는 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <Receipt explanation="이름을 입력하고 정산을 시작하세요!">
            <div className="invite-container">
                {currentRoom ? (
                    <p className="invite-text">
                        환영합니다😊<br />
                        &#39;{currentRoom.roomName}&#39; 정산에 초대 되셨습니다.<br />
                        현재 인원: {currentRoom.members.length}명
                    </p>
                ) : (
                    <p className="invite-text">방 정보를 불러오는 중입니다...</p>
                )}
            </div>

            <div className='start-container'>
                <input
                    className='input-box'
                    placeholder="이름을 입력하세요"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>} 
                <button className='button-start' onClick={handleStartCalculation}>정산 시작하기</button>
            </div>
            <Footer />
        </Receipt>
    );
};

export default EnterUserPage;
