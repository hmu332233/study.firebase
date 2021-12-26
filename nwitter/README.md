# Nweet

## firebase 실습

- 인증: authentication
- 트윗 정보 저장: firestore
- 이미지 저장: storage


## 보안

- 특정 도메인에서만 인증을 사용할 수 있도록 처리 가능
  - Authentication -> Sign-in Method -> 승인된 도메인
- 룰을 설정할 수 있음
  - \[서비스\] -> Rules
  - [rules 문서](https://firebase.google.com/docs/rules/get-started?authuser=0)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents { // 아무 데이터베이스의 documents들에 대해서
    match /{document=**} { // 아무 document들을
      allow read, write: if // read, write를 허용하겠다
          request.time < timestamp.date(2022, 1, 19); // 22년 1월 19일 이전 요청일때만
    }
  }
}
```