# 용기내 🌱
|이름|역할|
|---|---|
|김용빈|페이지 레이아웃 구성, API 호출|
|신동윤|페이지 스타일 수정, DB 설계 및 관리, API 호출 및 정보 가공|


# Ⅰ. 소개
- 환경을 위해 다회 용기를 이용하여 포장해오는 일명 “용기내 챌린지” 에 참여하는 사람들을 위한 커뮤니티
- 용기내 챌린지에 참여하는 사람들의 불편을 줄이고, 인지도를 높여 더 많은 사람을 이 챌린지에 동참하게 만들어 개인이 쓰레기 문제를 해결할 수 있게 함

**********

# Ⅱ. 주요 기능
1. 근처 다회용기 포장 가능 식당 찾기
![kakaomapapi](https://user-images.githubusercontent.com/80439545/156924983-12a511b5-5488-4ae4-890b-c871592d4928.JPG)


2. 리뷰 올리기
![리뷰](https://user-images.githubusercontent.com/80439545/156925004-cd47acc5-055a-40a0-900f-ff31f5f091da.JPG)


3. 챌린지 공유하기
![zfzfzfzf](https://user-images.githubusercontent.com/80439545/156925028-e7265cb7-170c-48a9-9c19-238512fb1ab4.JPG)


**********

# Ⅲ. 프로젝트 전체 구조
![](https://images.velog.io/images/eastgloss0330/post/7ef894d1-bed8-443a-a83b-16c2f0c13d87/image.png)

프로젝트 전체 구조


## 01. server.js, package.json, package-lock.json
```
┣ 📜package-lock.json
┣ 📜package.json
┣ 📜server.js
```
### (1) package.json

**package.json**에는 프로젝트에 사용한 모듈 정보가 포함되어 있다. npm install을 통해 모듈을 설치할 수 있다.

### (2) server.js
**server.js**는 entry point이다. ```node server.js```를 통해 서버를 작동하고 http://localhost:3000으로 접속한다. 

다만, 본 프로젝트 개발 중에는 서버 실행 시 서버의 무중단 서비스를 가능하게 해주는 ```pm2```라는 모듈을 사용했다. ```pm2 start server.js --watch --ignore-watch="uploads/*"``` (이 명령어가 오류가 난다면 ```pm2 start server.js --watch --ignore-watch="uploads/"``` ) 명령어를 사용하여 서버를 실행했다. 위 명령어로 실행시 이용자의 파일 업로드에 의한 uploads파일 변화를 감지하지 않기 떄문에 세션이 유지된다.


## 02. models
```
📦models
┣ 📜Challenge.js
┣ 📜Comment.js
┣ 📜Review.js
┗ 📜User.js
```
MongoDB와 연결하고, schema를 생성한다.


![](https://images.velog.io/images/eastgloss0330/post/85e9e7fc-62f7-45e4-9b9e-a68559da1ebb/image.png)

본 프로젝트에서 사용한 스키마는 위와 같다. Challenge.js는 challengeschema를, Comment.js는 commentschema를, Review.js는 reviewschema를, 그리고 User.js는 schema(유저 데이터가 들어감)를 생성한다.

## 03. public
```
📦public
┣ 📂css
┃ ┣ 📜challenge.css
┃ ┣ 📜chall_select.css
┃ ┣ 📜create.css
┃ ┣ 📜detail.css
┃ ┣ 📜envinfo.css
┃ ┣ 📜login.css
┃ ┣ 📜main.css
┃ ┣ 📜mainpage.css
┃ ┣ 📜map.css
┃ ┣ 📜mypage.css
┃ ┗ 📜review.css
┣ 📂js
┃ ┣ 📜challenge.js
┃ ┣ 📜map.js
┃ ┗ 📜review.js
┣ 📜banner1.png
┣ 📜banner2.png
┣ 📜banner3.png
┗ 📜favicon.ico
```

프로젝트에서 활용한 static 자원들이다.

## 04. router
```
📦router
┣ 📜account.js
┣ 📜challenge.js
┣ 📜envinfo.js
┣ 📜main.js
┣ 📜mypage.js
┣ 📜place.js
┗ 📜review.js
```

라우터를 분리해서 구성했다. server.js에 아래와 같이 명시하여 라우터의 구조를 잡았다.
```javascript
app.use("/place", require('./router/place.js'));
app.use("/account", require('./router/account.js'));
app.use("/review", require('./router/review.js'));
app.use("/challenge", require('./router/challenge.js'));
app.use("/mypage", require('./router/mypage.js'));
app.use("/envinfo", require('./router/envinfo.js'));
```

## 05. uploads
```
📦uploads
┗ 📜yonginae_default.jpg
```

사용자가 업로드하는 media자원들이 저장되는 위치이다. ```yonginae_default.jpg```는 사용자가 리뷰 작성 시 사진을 업로드 하지 않았을 때 기본으로 첨부되는 이미지 파일이다.

## 06. views
```
📦views
┣ 📂account
┃ ┣ 📜login.ejs
┃ ┗ 📜signup.ejs
┣ 📂challenge
┃ ┣ 📜challenge.ejs
┃ ┗ 📜review_select.ejs
┣ 📂envinfo
┃ ┗ 📜envinfo.ejs
┣ 📂mypage
┃ ┣ 📜mychallenge.ejs
┃ ┣ 📜mypage.ejs
┃ ┗ 📜myreview.ejs
┣ 📂place
┃ ┣ 📜place.ejs
┃ ┣ 📜place_create.ejs
┃ ┗ 📜place_review.ejs
┣ 📂review
┃ ┣ 📜create.ejs
┃ ┣ 📜detail.ejs
┃ ┣ 📜edit.ejs
┃ ┗ 📜review.ejs
┣ 📜header.ejs
┣ 📜index.ejs
┗ 📜nav.ejs
```

본 프로젝트에서는 template을 ejs로 사용하여 동적 페이지를 만들었다.

**********

# Ⅳ. 사용한 모듈
## 00. pacakge.json
![](https://images.velog.io/images/eastgloss0330/post/d0b6808e-4bd7-4894-a954-6213f1ced5e9/image.png)

package.json 내의 dependencies

* body-parser: POST 요청의 body(```req.body```)로부터 필요한 정보를 쉽게 추출할 수 있게 해준다.
(https://www.npmjs.com/package/body-parser)

* cookie-parser: 요청된 쿠키를 쉽게 추출할 수 있게 해준다.
(https://www.npmjs.com/package/cookie-parser)

* ejs: ejs 태그를 사용하여 동적인 페이지를 구성할 수 있게 해주는 템플릿 엔진이다.
(https://www.npmjs.com/package/ejs)

* entities: API로 데이터를 받아올 때, 데이터 내부의 문자열이 HTML엔티티(e.g., ```&lt;```, ```&gt;```)를 포함하고 있는 경우가 있었다. 이때 이러한 HTML 엔티티를 문자로 변경해주는 모듈이다.
(https://www.npmjs.com/package/entities)

* express: Node.js 웹 어플리케이션 프레임워크
(https://www.npmjs.com/package/express)

* express-session: Express프레임워크에서 사용할 수 있는 세션 미들웨어. 로그인 정보 저장 시 사용했다.
(https://www.npmjs.com/search?q=express-session)

* mongoose: MongoDB ODM. DB 조작을 자바스크립트 객체를 통해 실시할 수 있게 한다. MongoDB의 schema 필드를 설정할 수 있게 하고, ```populate```를 통해 SQL의 join과 유사한 결과를 반환받을 수 있다. 
(https://www.npmjs.com/package/mongoose)

* multer: 사용자가 업로드한 파일을 처리할 수 있게 한다. (multipart/form-data)
(https://www.npmjs.com/search?q=multer)

* pm2: Node.js 어플리케이션의 프로세스 매니저. 변경사항 반영 및 서버 로그를 확인을 용이하게 한다. 
(https://www.npmjs.com/package/pm2)

* request: url에 자원을 요청하고 응답을 받는 과정을 간결하게 해주는 모듈이다. api를 사용할 때 활용했다. 2020년 2월에 deprecated되었다.
(https://www.npmjs.com/package/request)

* serve-favicon: 파비콘을 사용할 수 있게 해주는 모듈이다.
(https://www.npmjs.com/package/serve-favicon)

**********

# Ⅵ. 구현 중 이슈

## 1. 파일 업로드 이슈
### 🤔 Problem
- 리뷰 작성 시 사용자가 이미지 파일을 업로드하면 리뷰 조회 시 등록 이미지가 보여야 함
- express는 media 파일 업로드를 지원하는 내부 기능 존재하지 않음

### 💡 Solution
- multer 모듈을 install, 파일이 저장될 위치를 uploads 폴더로 지정.
- Review 데이터 스키마에 'filenamae'이라는 string 필드를 추가. 업르드된 파일명을 저장하는 방식을 채택.
- 이미지를 불러올 때 uploads 폴더 내 'filename필드의 value'로 불러올 수 있었음

## 2. 지도 검색 결과 가까운 거리 순 표시
### 🤔 Problem
- 프로젝트에 사용한 카카오 지도 API에는 현 위치에서 가까운 거리 순으로 검색 결과를 표시하는 기능이 존재하지 않음.

### 💡 Solution
- geolocation API를 통해 받아 온 모바일 기기의 현재 위도, 경도 값을 활용함.
- 카카오 지도 API 장소 검색 결과가 return하는 데이터 내에는 특정 장소의 x, y좌표 값이 포함되어 있음.
- geolocation에서 받은 위도, 경도 값과 카카오 API가 반환한 검색 결과 내의 좌표값의 직선 거리를 구하고, 직선 거리가 짧은 순서대로 정렬하여 user에게 반환.

## 3. 특정 매장 별 리뷰 조회, 작성
### 💡 Solution
- 카카오 지도 API 장소 검색 결과가 return하는 데이터 내에는 특정 장소의 고유 id값이 포함되어 있음.
- 장소의 고유 id를 그 장소 정보를 포함하는 tag 내 id로 활용하여 이를 클릭하면 ‘localhost:3000/place 3000/place/place_review/:id/:place_name name’ 경로로 이동할 수 있게 함.
- POST 방식으로 위 경로에 접근하면 특정 매장 리뷰 작성, GET 방식으로 접근하면 특정 매장 리뷰 조회.

## 4. 챌린지 - 리뷰 연동
### 🤔 Problem
- 챌린지 데이터는 리뷰 데이터를 참조해야 함.
- 리뷰 데이터 삭제 시 챌린지 데이터가 남아 있는 경우 데이터가 망가짐.
### 💡 Solution
- 리뷰 데이터 삭제 시 그를 참조하는 챌린지 데이터의 isDeleted 필드를 true로 변경 (기본값 false).
- 챌린지 데이터를 조회할 때 isDeleted 필드의 값이 false인 것만 조회하면 '리뷰 데이터를 삭제할 경우 그를 참조하는 챌린지 데이터도 삭제된다'라는 요구사항을 충족시킬 수 있음.
