## image
![fafafafs1](https://github.com/user-attachments/assets/59b7e007-c589-476b-b63d-fe2ae4847427)

## problem
  1. 데이터 상세 구조 불일치
      - response object 내부구조, 자료형 미통일
  2. axios parallel data fetch -> 갑작스런 Promise.all로의 변경
      - contextAPI에서, render UseRef Boolean 도입
      - initial type 와 FetchIsOver type 분리 가능
  3. gpu 환경 아니면 model이 overhead를 못버티고 금방 종료됨
      - gpu or k8s에서 실행
     
