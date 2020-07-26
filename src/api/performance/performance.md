# Performance Test 내용

## table of contents
- GET /performances/
- GET /performances/:mt20id


## GET /performances/

### 성공
- 상태코드 200 응답
- performance 객체를 담은 배열 응답
- 최대 limit 개수만큼 응답

### 실패
- limit이 숫자형이 아니면 상태코드 400 응답


## GET /performances/:mt20id

### 성공
- mt20id 값에 해당하는 performance 객체를 반환
### 실패
- mt20id 에 해당하는 값을 찾을 수 없는 경우 상태코드 404 응답


