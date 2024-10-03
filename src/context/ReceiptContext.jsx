import { createContext, useContext, useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const ReceiptContext = createContext();

export const useReceipts = () => useContext(ReceiptContext);

export const ReceiptProvider = ({ children }) => {
    const [currentRoom, setCurrentRoom] = useState(null); // 현재 방의 상세 정보
    const [predictData, setPredictData] = useState([
        {
            id: 1,
            ResultimgURL: "https://dummyimage.com/600x400/000/fff&text=Processed+Image+1",
            imgURL: "https://dummyimage.com/600x400/000/fff&text=Original+Image+1",
            answer_text: {
                title: "Loading",
                date: "Loading",
                address: "Loading",
                items: [
                    { name: "Loading", price: 0, quantity: 1 },
                ],
            },
            order: 1,
        }
    ]); // img update되면, 채워짐

    //image upload가 되면, 이 context 변수를 setting
    const [receiptNumber, setReceiptNumber] = useState(0);
    const [imageUrl, setImageUrl] = useState();
    // 이 함수를 update 확인 모달에 삽입하여, 데이터를 predictData에 채우도록 함
    const isFatched = useRef(false);
    const getPredictData = async () => {
        
 
        const requests = [];

        // 병렬 요청을 위한 axios.get 호출
        for (let order = 0; order < receiptNumber; order++) {
          console.log(`Request ${order} sent at: ${Date.now()}`); // 요청 보낸 시간
          console.log(imageUrl[order]);
          
          requests.push(
            axios.post(`http://localhost:5001/flaskapi/${order}`, {imageUrl: imageUrl[order]})
              .then(response => {
                console.log(`Response ${order}:`, response.data); // 응답 데이터 로그
                console.log(`Response ${order} received at: ${Date.now()}`); // 응답 받은 시간
                return response.data;
              })
          );
        }
  
        // 모든 요청을 병렬로 처리
        try {
          const responses = await Promise.all(requests);
          const fetchedData = responses.map((response) => response);
          setPredictData(fetchedData);
          isFatched.current = !isFatched.current;
          
          console.log(fetchedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
    
 

    // 특정 roomId에 해당하는 방 데이터를 서버에서 가져오는 함수
    const fetchRoomDataFromServer = async (roomId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/room/${roomId}`); // roomId에 해당하는 방 정보 가져오기
            if (!response.ok) {
                // 서버 에러일 경우 상태 코드를 로그로 출력
                console.error(`Error: ${response.status} - ${response.statusText}`);
                throw new Error(`Failed to fetch room data: ${response.status}`);
            }

            const roomData = await response.json(); // JSON 형식의 데이터를 받아옴

            setCurrentRoom(roomData); // 방 정보를 현재 room으로 설정
        } catch (error) {
            console.error("Error fetching room data:", error);
        }
    };
    const updateRoomMembers = async (roomId, memberName) => {
        try {
            // 본인 이름을 API로 Room의 멤버로 추가
            const response = await fetch(`http://localhost:8080/api/member/${roomId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ memberName }),
            });

            if (!response.ok) {
                throw new Error('멤버 추가에 실패했습니다.');
            }

            const updatedRoom = response.data; // 서버에서 반환된 updatedRoom 정보를 받음
            setCurrentRoom(updatedRoom); // context에서 currentRoom 업데이트


        } catch (error) {
            console.error('멤버 추가 실패:', error);
        }
    };

    // 현재 Room 데이터를 반환하는 함수
    const getRoomById = (roomId) => {
        // fetchRoomDataFromServer 함수가 호출된 후 currentRoom이 업데이트되므로
        // 현재 방 정보가 currentRoom과 일치하는지 확인합니다.
        return currentRoom?.roomId === roomId ? currentRoom : null;
    };

    return (
        <ReceiptContext.Provider
            value={{
                currentRoom,
                fetchRoomDataFromServer,
                getRoomById,
                updateRoomMembers,
                setReceiptNumber,
                predictData,
                setPredictData,
                getPredictData,
                setImageUrl,
                setCurrentRoom,
                isFatched
            }}
        >
            {children}
        </ReceiptContext.Provider>
    );
};


// PropTypes 추가
ReceiptProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
