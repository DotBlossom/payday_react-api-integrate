import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ReceiptContext } from "../context/ReceiptContext";

const RoomCreationPage = () => {
    const [roomName, setRoomName] = useState("");
    const { createRoom } = useContext(ReceiptContext);
    const navigate = useNavigate();

    const handleCreateRoom = () => {
        if (!roomName.trim()) {
            alert("방 이름을 입력하세요.");
            return;
        }
        const roomId = createRoom(roomName);
        navigate(`/room/${roomId}`, { state: { roomName } });
    };

    return (
        <div>
            <h1>방 생성</h1>
            <input type="text" placeholder="방 이름 입력" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
            <button onClick={handleCreateRoom}>방 생성</button>
        </div>
    );
};

export default RoomCreationPage;
