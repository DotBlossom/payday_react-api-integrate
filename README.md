## image
![fafafafs1](https://github.com/user-attachments/assets/59b7e007-c589-476b-b63d-fe2ae4847427)

gcp k8s cluster로 올리고 요청 받으면 정규화 되어 정보가 와서 ,local api 실행 이미지 올림

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
    
### contextAPI stateProp : noRenderAriseSave , if session is end -> process save

## 특이 구조
      1. image upload 사이즈에 맞는 dummy context 생성을 함
      2. 그리고 imageURL(cloud)를 받아 다음 상태로 넘김 + dummydata(loading)
          - 요청부터 idx를 이용하여, 개별 response를 context state에 fetch
      3. contextAPI에서 예측결과를 비동기적으로 받아와 로딩완료
    

## 추가 repositoty

### https://github.com/DotBlossom/flask-api-actual
flask api buffer 서버 구조 설명


### https://github.com/DotBlossom/payday_springboot-main
jwt 구조가 아닌 임시 link-instant_user 구조


## link 요청을 통한 instant room 구조.
    그것을 위한 spring backend 구성

## k8s 배포 구현
![sssd](https://github.com/user-attachments/assets/3eab83dd-a0da-4e42-8c53-1dd0e068f33c)


### 각 yaml 파일 작성 및 배포 순서 등 결정.

    1. ingress-nginx/cloud를 linux cloud에 설치, LB의 external IP or DomainName sh로직으로 가져옴
    2. LB로 구성한 내부 API 서비스들을 ingress에 routing 하고, ingress 외부 접근 주소 ( LB의 external IP or DomainName)를
       각 서버단 API 요청에 root URL 로 삽입 후 image push
    3. 상황에 따라, configMap-> DB -> 이후는 유동적으로 배포 순서 결정(이미지 build를 각자 상황에 맞게 유동적으로 중간중간 하는 경우 존재)
    4. secret key를 configMap secret || linux container 내부에 접속하여, 파일 생성 후 echo > filename 해주자
    5. ingress-config.yaml 을 k8s에 적용 후, 전체 server 확정 구동.
