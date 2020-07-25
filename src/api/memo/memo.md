# Memo Test 내용

## table of contents
- GET /memos/
- GET /memos/:id
- POST /memos
- PUT /memos/:id
- DELETE /memos/:id


## GET /memos/

### 성공
- 상태코드 200을 응답
- 메모 객체를 담은 배열을 응답
- 최대 limit 개수만큼 응답

### 실패
- limit이 숫자형이 아니면 400을 응답


## GET /memos/:id

### 성공
- id가 1인 메모 객체를 반환
### 실패
- id가 숫자가 아닐경우 400으로 응답
- id로 메모를 찾을 수 없는 경우 404로 응답


## POST /memos

### 성공
- 201 상태코드를 반환
- 생성된 메모 객체를 반환
- 입력한 title 반환
- 입력한 content 반환

### 실패
- title 누락시 400을 반환
- content 누락시 400을 반환


##  PUT /memos/:id

### 성공
- 변경된 title 응답
- 변경된 content 응답

### 실패
- 정수가 아닌 id일 경우 400 응답
- title이 없을 경우 400 응답
- content가 없을 경우 400 응답
- 없는 메모일 경우 404 응답


##  DELETE /memos/:id

### 성공
- 204를 응답

### 실패
- id가 숫자가 아닐경우 400으로 응답
- id로 메모를 찾을수 없을 경우 404로 응답
