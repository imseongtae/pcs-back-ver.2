# User Test 내용

## table of contents
- GET /users/
- GET /users/:id
- POST /users
- PUT /users/:id
- DELETE /users/:id


## GET /users/

### 성공
- 상태코드 200을 응답
- 유저 객체를 담은 배열로 응답
- 최대 limit 갯수만큼 응답

### 실패
- limit이 숫자형이 아니면 400을 응답



## GET /users/:id

### 성공
- id가 1인 유저 객체를 반환
### 실패
- id가 숫자가 아닐경우 400으로 응답
- id로 유저를 찾을수 없을 경우 404로 응답


## POST /users

### 성공
- 201 상태코드를 반환
- 생성된 유저 객체를 반환
- 입력한 name을 반환

### 실패
- name 파라매터 누락시 400을 반환
- name이 중복일 경우 409를 반환


###  PUT /users/:id

### 성공
- 변경된 name을 응답

### 실패
- 정수가 아닌 id일 경우 400 응답
- name이 없을 경우 400 응답
- 없는 유저일 경우 404 응답
- 이름이 중복일 경우 409 응답


##  DELETE /users/:id

### 성공
- 204를 응답

### 실패
- id가 숫자가 아닐경우 400으로 응답
- 존재하지 않는 사용자일 경우 404로 응답
