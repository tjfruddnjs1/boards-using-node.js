# boards-using-node.js

## Reference

1.  https://www.a-mean-blog.com/ko/blog/Node-JS-%EC%B2%AB%EA%B1%B8%EC%9D%8C/%EA%B2%8C%EC%8B%9C%ED%8C%90-%EB%A7%8C%EB%93%A4%EA%B8%B0 > 프로젝트 전반적인 내용

- **차별점** : `mongoose > sequelize sequelize-cli mysql2`

2. NodeJS 교과서 개정 2판

## 1. 게시판 - 프로젝트 생성, 개요

- 게시물-작성자와 같은 관계를 만드는 법과 로그인, 회원가입 같은 좀 더 실용적인 기능들에 대해 알아보기
- 개요 부분에 있어서는 navbar 및 기본적인 static 페이지 생성 > 주소록과의 차이점은 온라인상의 폰트를 가져와 웹사이트에서 사용
  > 프로젝트 생성 : 모든 항목을 skip하고 기본값으로 구성된 package.json 생성

```
npm init --yes
```

> [package.json](https://github.com/tjfruddnjs1/boards-using-node.js/blob/main/package.json) : 프로젝트 설치 패키지

```
npm i --save ejs express express-session method-override sequelize sequelize-cli myslq2 morgan

npm i -D nodemon
```

- 제작자가 사용하는 `body-parser`패키지는 현재 `express에 내장`되어 제외
  > 프로젝트 폴더 전체적인 구조
  > <br> > <img src="https://user-images.githubusercontent.com/41010744/104975829-1b285680-5a3f-11eb-993d-148051dab011.png"> > <br>

> 1. `npx sequelize init` 을 통한 config, models, migrations, seeders 폴더 생성

- `config`에 database 설정
- `models`에 향후 테이블 생성 및 컬럼/관계 설정

> 2. `app.js에 패키지 기본 설정`

- [app.js](https://github.com/tjfruddnjs1/boards-using-node.js/blob/main/app.js)
- 사용 모듈 express, morgan(추가 log), method-Override(method 확장을 위한), sequelize(database) 설정
- `router 설정` > homeRouter를 메인 페이지로 > [routes/home.js](https://github.com/tjfruddnjs1/boards-using-node.js/tree/main/routes)
- error처리 및 포트(3000) 연결

> 3. [views/partials/head.ejs](https://github.com/tjfruddnjs1/boards-using-node.js/blob/main/views/partials/head.ejs)

- 주소록과 같이 부트스트랩 설정 및 css파일 적용은 같지만 `web font`설정하는 작업이 있다
- 구글에서 제공하는 웹폰트를 https://fonts.google.com 에서 검색하여 사용할 수 있습니다.

1. 폰트를 찾아 해당 폰트를 사용하고 싶다면 'Select this font` 클릭
2. '1 family selected' 박스를 클릭시 `Embed Font`항목과 `Specify in CSS` 항목이 있는데 전자는 `font를 어떻게 내 프로젝트에 가져오는지를 설명(박스 안의 내용을 html head)에 넣어라`, 후자는 `css 파일에서 어떻게 해당 폰트를 사용할지`

> 4. [views/partials/nav.ejs](https://github.com/tjfruddnjs1/boards-using-node.js/blob/main/views/partials/nav.ejs)

- 네비게이션 메뉴는 주소록 만들기 예제와 구조가 같습니다.

> 5. [views/home/welcome.ejs](https://github.com/tjfruddnjs1/boards-using-node.js/blob/main/views/home/welcome.ejs)

- jumbotron이라는 class를 사용했는데 이는 bottstrap에서 제공하는 컴포넌트입니다. https://getbootstrap.com/docs/4.4/components/jubnotron 에서 자세한 설명을 볼수있습니다. 이처럼 bootstrap 사이트에서 맘에 드는 component가 있으면 가져다가 사용하면 됩니다.

> 6. [public/css/marster.css](https://github.com/tjfruddnjs1/boards-using-node.js/blob/main/public/css/master.css)

- `Open Sans` 폰트를 body에다가 적용 > 이렇게 body에 css를 설정하면 전체 사이트에 적용

- > **결과사진 : 메인 페이지(home)**

<br>
<img src="https://user-images.githubusercontent.com/41010744/104978304-eddea700-5a44-11eb-972a-7831b1264818.png">
<br>

## 2. 게시판 - Back End 개발

- 이제 게시판 CRUD를 만들텐데 두 파트로 나누어 2번 단계에서 back end를 3번 단계에서 front end 코드를 작성할 예정
- 2번 단계에서 `Post(게시글) model을 만들고 backend CRUD`를 구현

> 1. [models/post.js]() : DataBase Table Setting

- 4개의 컬럼으로 구성 > title, body, createdAt, updatedAt
- `timestamps : true`를 통해 자동 생성할 수도 있지만 현재는 눈으로 컬럼을 확인할수 있게 직접 작성
- `title` : 제목, varchar(50), Not Null
- `body` : 내용, varchar(1500)
- `createdAt` : 생성일, date, default : Date.now
- `updatedAt` : 업데이트 날짜, date

> 2. [routes/posts.js]() : 7 standard actions 구현
>    생성

- New : 생성폼(from)을 사용자에게 보여주고,
- Create : 전달 받은 자료를 실제로 생성하는 과정 필요
  > 수정
- Edit : 수정폼을 사용자에게 보여주고,
- Update : 전달 받은 자료를 바탕으로 현재 자료를 수정
  > 조회
- Index : 자료들의 목록을 조회
- Show : 하나의 자료를 상세히 보여주기
  > 삭제
- Destroy : 자료를 삭제
  <br>

- 다른 부분은 이전 실습 프로젝트인 주소록과 다를게 없지만 `index` 부분의 게시물을 정렬(order 사용)한다는 점이 다른 모습

## 3. 게시판 - Front End 개발

- 2번 단계에서 구현헀던 router들이 실제로 동작할 Front End를 작성

> 1. [public/script.js]() : 서버에서 사용하는 코드가 아닌 client 브라우저에서 사용하게될 javascript 코드 > public 폴더에서 넣어 `head.ejs` 파일에 이 파일을 불러오는 코드가 작성

- `convertDate, convertDateTime` 함수가 하는일만 살펴보자 : 나머지 `get2digits, getDate, getTime` 함수는 위 두함수에서 사용되는 함수
- `convertDate`함수 : html element 중에 `data-date`이 있는 것을 찾아 해당 데이터를 `년-월-일`의 형태로 변환해서 element의 텍스트 데이터로 넣습니다.

```html
<span data-date="2020-01-08T20:08:24.586Z"></span>
// -->
<span data-date="2020-01-08T20:08:24.586Z">2020-01-08</span>
```

- `convertDateTime`함수 : `data-date-time`을 찾아 `년-월-일 시:분:초`의 형태로 변환하여 출력
- 이렇게 하는 이유는 JavaScript에서 날짜/시간을 원하는 형태(format)으로 만들 기 위해서입니다. JavaScript는 일정한 형태로만 날짜/시간을 출력하는데, '2020-01-01'과 같은 형태로 출력하려면 `moment`같은 외부 라이브러리를 사용하거나 직접 해당 함수를 만들어야 합니다.
- jQuery 문법 사용 > 모르는 내용 > http://tcpschool.com/jquery/intro
- `views/partials/head.ejs`에서 public/js/script.js 스크립트를 client에서 호출하는 코드 추가

```html
<script src="/js/script.js"></script>
```

- `views/partials/nav.ejs`에서 메뉴(board) 추가

```html
<li calss="nav-item"><a href="/posts" class="nav-link">Board</a></li>
```

> 2. [views/...]()

- `posts/index.ejs` : Post의 index를 table로 표시합니다.
- <-- 1 --> : data-date가 element로 사용 > public/js/script.js에 의해 post.createdAt(게시물 작성시간)이 년-월-일 형태로 출력
- `posts/new.ejs` : https://getbootstrap.com/docs/4.4/components/breadcrumb 를 사용 > breadcrumb는 빵 부스러기를 뜻함 > '헨젤과 그레텔'에서 지나온 길을 남긴것과 같은 기능
- `posts/show.ejs` : bootstrap의 `row, col-?` 를 사용해서 html element 안의 공간을 분할할 수 있습니다.
- `row` class element 안에 `col-?` class element를 넣은 구조인데 ? 에는 기본적으로 1에서 12사이의 숫자가 들어갈 수 있습니다.
- 예를들어 `row`안에 `col-6`을 두개 넣어주면 공간이 6:6 즉 반반으로 나누어집니다.
- col-sm-?, col-md-? 와 같이 사이즈를 지정해주면, 화면이 작을때(sm), 보통일 때(md), 클때(lg), 아주 클때(xl)로 나누어서 적용시킬수 있습니다.
- 자세한 설명은 https://getbootstrap.com/docs/4.4/layout/grid 참고
- data-date-time이 Created, Updated 옆의 element에 사용 > 게시물 작성된 시간, 수정된 시간이 `년-월-일 시:분:초` 형태로 출력
- `posts/edit.ejs` : new와 구성이 비슷하지만 `form action에 ?_method=put` 을 통해 update > `method_override package`

> 3. [public/css/master.css]()

- <-- 1 --> : ellipsis는 해당 element의 text가 너무 길 경우, 넘치는 text를 ...로 표시
- <-- 2 --> : 이 부분이 없으면 게시물 본문의 줄바꿈(`/n`)이 표현되지 않습니다. 왜냐하면 HTML에서의 줄바꿈은 (`<br/>`)이기 때문이다. 해당 부분을 통해 `/n`이 제대로 줄바꿈을 표현할 수 있습니다.

> **결과사진1 : 게시판**

<br>
<img src="https://user-images.githubusercontent.com/41010744/105178242-1d87cf00-5b6b-11eb-9182-d72cf18667ac.png">
<br>

> **결과사진2 : show 기능**

<br>
<img src="https://user-images.githubusercontent.com/41010744/105178381-45773280-5b6b-11eb-93fd-3244994fb971.png">

> **결과사진3 : Edit 기능 (변경 전/후)**

<br>

<img src="https://user-images.githubusercontent.com/41010744/105178447-62ac0100-5b6b-11eb-97a5-e9ad57b221f7.png">
<br>
<img src="https://user-images.githubusercontent.com/41010744/105178778-d51ce100-5b6b-11eb-9f9a-eed455b69435.png">
<br>

> **결과사진4 : Destroy 기능 (삭제 전/후)**

<br>
<img src="https://user-images.githubusercontent.com/41010744/105178936-085f7000-5b6c-11eb-880f-ab257630524e.png">
<br>
<img src="https://user-images.githubusercontent.com/41010744/105179005-1ca36d00-5b6c-11eb-8ea3-8a3e06f38ad9.png">
<br>
