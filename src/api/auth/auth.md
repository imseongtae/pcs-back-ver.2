# Memo Test 내용

## table of contents

- GET /auth/signup
- GET /auth/me


## GET /auth/signup

### 성공
- 상태코드 201 응답
- 사용자 nickname 반환

### 실패
- email 파라매터 누락시 400을 반환
- email 중복일 경우 409를 반환


## GET /auth/me

### 성공
- 상태코드 200 응답
- 사용자 정보를 담은 객체 응답

### 실패
- 상태코드 401 응답
- Authorization 오류 발생
