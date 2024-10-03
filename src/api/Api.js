import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/room';

export const createRoomApi = async (roomId, roomName, leader, memberCount, generatedUrl) => {
    try {
      const data = {
        roomId,
        roomName,
        leader,
        memberCount,
        generatedUrl,
      };
      console.log('백엔드로 전송할 데이터:', data);  // 전송할 데이터 확인
  
      const response = await axios.post(API_BASE_URL, data);
      console.log('백엔드 응답:', response.data);  // 백엔드 응답 확인
  
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('서버 응답 오류:', error.response.data);
      } else if (error.request) {
        console.error('요청이 전송되었으나 응답이 없습니다:', error.request);
      } else {
        console.error('요청 설정 중 오류 발생:', error.message);
      }
      throw error;
    }
  };
  