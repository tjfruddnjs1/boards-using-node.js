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

> [package.json]() : 프로젝트 설치 패키지

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

- [app.js]()
- 사용 모듈 express, morgan(추가 log), method-Override(method 확장을 위한), sequelize(database) 설정
- `router 설정` > homeRouter를 메인 페이지로 > [routes/home.js]()
- error처리 및 포트(3000) 연결

> 3. [views/partials/head.ejs]()

- 주소록과 같이 부트스트랩 설정 및 css파일 적용은 같지만 `web font`설정하는 작업이 있다
- 구글에서 제공하는 웹폰트를 https://fonts.google.com 에서 검색하여 사용할 수 있습니다.

1. 폰트를 찾아 해당 폰트를 사용하고 싶다면 'Select this font` 클릭
2. '1 family selected' 박스를 클릭시 `Embed Font`항목과 `Specify in CSS` 항목이 있는데 전자는 `font를 어떻게 내 프로젝트에 가져오는지를 설명(박스 안의 내용을 html head)에 넣어라`, 후자는 `css 파일에서 어떻게 해당 폰트를 사용할지`

> 4. [views/partials/nav.ejs]()

- 네비게이션 메뉴는 주소록 만들기 예제와 구조가 같습니다.

> 5. [views/home/welcome.ejs]()

- jumbotron이라는 class를 사용했는데 이는 bottstrap에서 제공하는 컴포넌트입니다. https://getbootstrap.com/docs/4.4/components/jubnotron 에서 자세한 설명을 볼수있습니다. 이처럼 bootstrap 사이트에서 맘에 드는 component가 있으면 가져다가 사용하면 됩니다.

> 6. [public/css/marster.css]()

- `Open Sans` 폰트를 body에다가 적용 > 이렇게 body에 css를 설정하면 전체 사이트에 적용

- > **결과사진 : 메인 페이지(home)**

<br>
<img src="https://user-images.githubusercontent.com/41010744/104978304-eddea700-5a44-11eb-972a-7831b1264818.png">
<br>
