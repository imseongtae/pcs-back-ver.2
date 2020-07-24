# PCS Back-end
Performance Community Site Back-end 코드 저장소입니다. 
서비스 기획부터 배포까지 모든 과정을 체험하기 위해 프로젝트 진행하였고, 현재 진행 중입니다.

> 아래 이미지는 프로젝트 판넬입니다.

![image](https://user-images.githubusercontent.com/60806840/88348206-c5247000-cd87-11ea-97dc-c679f2570dcd.png)


## table of contents
1. [사용된 기술](#사용된-기술)
1. [API](#api)
1. [Test Code](#test-code)

## 사용된 기술
Back-end와 Front-end를 함께 작업하고 있습니다.

### 기술 구조도
![image](https://user-images.githubusercontent.com/60806840/88347961-1aac4d00-cd87-11ea-9e29-b8fdd60f73ee.png)


#### Back-end 
- `node.js`, `express`, `MySQL`, `sequelize`, `Puppeteer.js`

#### Front-end
- `Vue.js`, `Vuex`, `SCSS`, `axios`, `javascript es6+`, `html/css`

#### Design Tool
- `Figma`, `Sketch`

#### 프로젝트에 적용할 기술
- `AWS EC2`, `AWS RDBMS(MySQL)`, `AWS S3` 등


## API
![image](https://user-images.githubusercontent.com/60806840/88349495-43364600-cd8b-11ea-9c90-93cb9d97b53e.png)

### 현재 작업된 API 
- 사용자에게 시설 정보를 제공하기 위한 `facility API`
- 사용자가 작성한 메모에 대해 CRUD 작업을 수행하는 `memo API`
- User에 대해 CRUD 작업을 수행하는 `user API`

### 추가할 API
- 사용자에게 공연 정보를 제공하기 위한 `performance API`
- 게시글에 대해 CRUD 작업을 수행하는 `POST API`

## Test Code
- 현재 45개의 테스트 케이스 추가
- 라이브러리는 `mocha`, `supertest`, `should` 를 사용
- `facility API`, `memo API`, `user API`에 대한 테스트 케이스 작성됨

## Puppeteer 
![image](https://user-images.githubusercontent.com/60806840/88349540-606b1480-cd8b-11ea-9847-d2db43345c9f.png)

- `Puppeteer`를 활용하여 공연예매 사이트 Interpark에서 조성진 공연 관람객 후기 **1155건** 크롤링
- 수집한 데이터는 `AWS RDBMS(MySQL)`에 저장


![image](https://user-images.githubusercontent.com/60806840/88349160-38c77c80-cd8a-11ea-9676-f844094e9037.png)

