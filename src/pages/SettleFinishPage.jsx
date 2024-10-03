import { useEffect, useState } from "react";
import Receipt from "../components/Receipt";
import WinnerPopup from "../components/WinnerPopup";
import ReceiptPopup from "../components/ReceiptPopup";
import './SettleFinishPage.css';
import { useReceipts } from "../context/ReceiptContext";
import { useParams } from "react-router-dom";

const SettleFinishPage = () => {
    const { roomId } = useParams();
    const [people, setPeople] = useState([]); // State for storing people
    const [winner, setWinner] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [showReceiptPopup, setShowReceiptPopup] = useState(false);
    const { currentRoom, fetchRoomDataFromServer, loading } = useReceipts(); // loading 상태 추가
    const [personReceiptMap, setPersonReceiptMap] = useState({}); // Initialize the personReceiptMap state

    useEffect(() => {
        const loadRoomData = async () => {
            if (!currentRoom && !loading && roomId) {
                await fetchRoomDataFromServer(roomId);
            } else if (currentRoom) {
                setPeople(currentRoom.members.map(member => ({
                    name: member.memberName, 
                    amount: member.receiptContentsPerMember.reduce((sum, receipt) => sum + (receipt.price * receipt.quantity), 0) || 0 
                })));
                
                 currentRoom.members.forEach(member => {
                     console.log(`Receipt Contents for ${member.memberName}:`, member.receiptContentsPerMember);
                     console.log(currentRoom.receipts)
        });
            }
        };

        loadRoomData();
    }, [currentRoom, loading, roomId, fetchRoomDataFromServer]);

    const totalAmount = currentRoom?.receipts?.reduce((total, receipt) => {
        return total + receipt.answer_text.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, 0) || 0;

    // Calculate remaining amount
    const remainingAmount = totalAmount - people.reduce((sum, person) => sum + person.amount, 0);

    const handlePersonClick = (person) => {
        const receipts = personReceiptMap[person.name] || []; 
        setSelectedPerson({ ...person, receipts });
        setShowReceiptPopup(true); 
    };

    const handleRandomDraw = () => {
        const randomIndex = Math.floor(Math.random() * people.length);
        const selectedPerson = people[randomIndex];

        setWinner({
            ...selectedPerson,
            remainingAmount: remainingAmount 
        });
        setShowPopup(true);  
    };

    const handleClosePopup = () => {
        setShowPopup(false);  
        setShowReceiptPopup(false);  
    };

    return (
        <Receipt>
            <h2 className="total-amount">전체 총액: {totalAmount.toLocaleString()}원</h2>
            
            {people.map((person, index) => (
                <p key={index} onClick={() => handlePersonClick(person)} className="clickable person-amount">
                    {person.name}님의 정산 금액은<br /> 총 <span className="amount">{person.amount.toLocaleString()}원</span> 입니다.
                </p>
            ))}

            <p className="remaining-amount">
                남은 금액의 1/{people.length} 금액은<br /> 
                <span className="amount">{(remainingAmount / people.length).toLocaleString()}원</span> 입니다.
            </p>

            <h5>금액을 클릭하여 정산 목록 확인</h5>
            <button className='button-mini random-draw-button' onClick={handleRandomDraw}>한 사람 몰아주기</button>

            {showReceiptPopup && selectedPerson && (
                <ReceiptPopup 
                    person={selectedPerson} 
                    onClose={handleClosePopup}
                    receipts={selectedPerson.receipts} 
                />
            )}
            {showPopup && winner && (
                <WinnerPopup 
                    winner={winner} 
                    onClose={handleClosePopup} 
                    remainingAmount={remainingAmount} 
                />
            )}
        </Receipt>
    );
};

export default SettleFinishPage;
