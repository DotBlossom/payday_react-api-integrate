## image
![fafafafs1](https://github.com/user-attachments/assets/59b7e007-c589-476b-b63d-fe2ae4847427)

## problem -> solve
  1. 데이터 상세 구조 불일치
      - response object 내부구조, 자료형 미통일
      - flask API 단에서 DATA refine 
  2. axios parallel data fetch -> 갑작스런 Promise.all로의 변경
      - contextAPI에서, render UseRef Boolean 도입
      - initial type 와 FetchIsOver type 분리 가능
      - fetch - render timing 일치 문제 해결
  3. gpu 환경 아니면 model이 overhead를 못버티고 금방 종료됨
      - gpu or k8s에서 실행
  
contextAPI stateProp : noRenderAriseSave , if session is end -> process save

## 특이 구조
  1. image upload 사이즈에 맞는 dummy context 생성을 함
  2. 그리고 imageURL(cloud)를 받아 다음 상태로 넘김 + dummydata(loading)
      - 요청부터 idx를 이용하여, 개별 response를 context state에 fetch
  3. contextAPI에서 예측결과를 비동기적으로 받아와 로딩완료


## 추가 repositoty
https://github.com/DotBlossom/flask-api-actual
https://github.com/DotBlossom/payday_springboot-main

## link 요청을 통한 instant room 구조.
그것을 위한 spring backend 구성
