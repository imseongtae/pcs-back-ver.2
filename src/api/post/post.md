# Memo Test 내용

## table of contents
- GET /posts/
- GET /posts/:id
- POST /posts
- PUT /posts/:id
- DELETE /posts/:id


## GET /posts/

### 성공
- 상태코드 200을 응답
- 게시글 객체를 담은 배열을 응답



## GET /posts/:id

### 성공
- id가 1인 게시글 객체를 반환
### 실패
- id가 숫자가 아닐경우 400으로 응답
- id로 게시글를 찾을 수 없는 경우 404로 응답


## POST /posts

### 성공
- 201 상태코드와 함께 생성된 게시글 객체 반환
- 입력한 title 반환
- 입력한 content 반환

### 실패
- title 누락시 400을 반환
- content 누락시 400을 반환


##  PUT /posts/:id

### 성공
- 변경된 title 응답
- 변경된 content 응답

### 실패
- 정수가 아닌 id일 경우 400 응답
- title이 없을 경우 400 응답
- content가 없을 경우 400 응답
- 없는 게시글에 대해 404 응답


##  DELETE /posts/:id

### 성공
- 게시물이 삭제될 경우 204 응답

### 실패
- id가 숫자가 아닐경우 400으로 응답
- id로 게시글을 찾을 수 없는 경우 404 응답
- 본인이 작성한 게시글이 아닐 경우 권한으로 인한 거절을 의미하는 403 응답
