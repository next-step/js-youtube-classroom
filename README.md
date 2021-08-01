<p align="middle" >
  <img width="200px;" src="src/assets/readme/laptop_with_youtube_logo.png"/>
</p>
<h2 align="middle">level1 - 나만의 유튜브 강의실</h2>
<p align="middle">자바스크립트와 외부 API를 이용해 구현 하는 나만의 유튜브 강의실</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"/>
</p>

<p align="middle">
  <a href="https://next-step.github.io/js-youtube-classroom/">🖥️ 데모 링크</a>
</p>

## 🔥 Projects!

<p align="middle">
  <img src="src/assets/readme/youtube_classroom_preview.png">
</p>

### 🎯 step1 검색 기능 UI

- [ ] [유튜브 검색 API](https://developers.google.com/youtube/v3/getting-started?hl=ko)를 통해서, 내가 추가로 보고 싶은 영상들을 검색할 수 있다.
  - [ ] 검색 시 엔터키를 눌렀을 때와 마우스로 검색 버튼을 눌렀을 때 검색 동작이 이루어진다.
- [ ] 로딩컴포넌트: 데이터를 불러오는 중일 때, 현재 데이터를 불러오는 중임을 skeleton UI로 보여준다.
- [ ] 검색 결과가 없는 경우 결과 없음 이미지를 추가하여, 사용자에게 메시지를 보여준다.
  - [ ] 검색 결과 없음 이미지는 `src/images/status/not_found.png` 경로에 있다.
- [ ] 최초 검색결과는 10개까지만 보여준다. 더 많은 데이터는 스크롤을 내릴 때 추가로 불러온다.
  - 검색 결과 화면에서 유저가 브라우저 스크롤 바를 끝까지 이동시켰을 경우, 그다음 10개 아이템을 추가로 api요청하여 불러온다.
- [ ] 내가 검색한 영상들의 json 데이터를 `저장`할 수 있다. (실제 저장이 아닌 영상 id를 Web Storage에 저장). 단 이미 저장된 경우는 저장 버튼이 보이지 않게 한다.
- [ ] 저장 가능한 최대 동영상의 갯수는 100개이다.
- [ ] 검색 모달에 다시 접근했을 때 가장 마지막에 검색한 키워드로 검색한 결과를 보여준다.
- [ ] 최근 검색 키워드를 3개까지 화면상에 검색창 하단에 보여준다.

### 🎯🎯 step2 강의실 관리 기능과 SPA

- [ ] **Browser History Api**를 이용하여 SPA처럼 라우팅을 적용한다.
- [ ] 가장 처음에는 저장된 영상이 없음으로, 비어있다는 것을 사용자에게 알려주는 상태를 보여준다.
- [ ] 이후 페이지를 방문했을 때 기본 메인 화면은 내가 **볼 영상**들의 리스트를 보여준다.
- [ ] 영상 카드의 이모지 버튼을 클릭하여 아래와 같은 상태 변경이 가능해야 한다.
  - [ ] ✅ 본 영상으로 체크
  - [ ] 🗑️ 버튼으로 저장된 리스트에서 삭제할 수 있습니다. (삭제 시 사용자에게 정말 삭제할 것인지 물어봅니다.)
- [ ] 사용자가 버튼을 클릭했을 때 해당 행위가 정상적으로 동작하거나, 실패하였음을 `snackbar`를 통해 보여준다.
- [ ] 본 영상, 볼 영상 버튼을 눌러 필터링 할 수 있다.
- [ ] 👍 좋아요 버튼을 누른 데이터만 필터링해서 보여줄 수 있는 메뉴를 만든다.
    - [ ] 👍 좋아요 버튼을 누른 경우, 로컬에서 데이터를 변경한다.
    - [ ] 👍 좋아요 버튼을 다시 클릭해서 해지할 수 있어야 한다.

### 🎯🎯 step3 with custom API
- [ ] 나의 동영상 관리 이력들을 API를 이용하여 관리합니다.
  - [ ] ✅ 버튼을 클릭하면 본 영상으로 체크한 상태값을 서버에 전달합니다.
  - [ ] 🗑️ 버튼으로 영상 리스트의 값을 삭제할 수 있습니다.
  - [ ] 👍 좋아요 버튼의 상태 값을 서버에 전달합니다.


<br>

## ⚙️ Before Started

#### <img alt="Tip" src="https://img.shields.io/static/v1.svg?label=&message=Tip&style=flat-square&color=673ab8"> 로컬에서 서버 띄워서 손쉽게 static resources 변경 및 확인하는 방법

로컬에서 웹서버를 띄워 html, css, js 등을 실시간으로 손쉽게 테스트해 볼 수 있습니다. 이를 위해서는 우선 npm이 설치되어 있어야 합니다. 구글에 `npm install` 이란 키워드로 각자의 운영체제에 맞게끔 npm을 설치해주세요. 이후 아래의 명령어를 통해 실시간으로 웹페이지를 테스트해볼 수 있습니다.

```
npm install -g live-server
```

실행은 아래의 커맨드로 할 수 있습니다.

```
live-server 폴더명
```

<br>

## 👏🏼 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/next-step/js-youtube-classroom/issues)에 등록해주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/next-step/js-youtube-classroom/blob/main/LICENSE) licensed.


---

### 구현을 시도한 과정 

<br/>

#### 1차 PR
- [x] youtube data api 키 발급받기
- [ ] 검색버튼 클릭시 검색어 쿼리에 해당하는 영상의 제목이 콘솔에 뜨도록 출력해보기 (api key 이용 테스트)
- [ ] 동영상 검색 버튼 클릭시 검색어 쿼리에 해당하는 영상의 제목이 콘솔에 뜨도록 출력해보기 (api key 이용 테스트)
- [ ] 동영상 검색 버튼 클릭시 검색창 인풋이 뜨도록 UI 작업하기
- 막힌 부분 : env 파일을 인식시키는 데 실패하였다. 
  dotenv 패키지를 import 로 가져오려고 하니 node_modules 내부의 상대경로로 찾아서 가져와야 했고, 
  require 로 가져오려고 하니 require를 인식못하는 문제가 있었다. (?!?!))
  
<br/>

#### 1차 PR 피드백
- 내가 구현하려는 방식을 '모듈화'라고 부른다는 것을 알게 되었다. 각각의 파일이 내부 스코프를 가진 클래스로서 하나의 주요기능을 위한 함수들을 갖고, 
export 하고 필요한 곳에서 import 하여 쓰는 방식을 모듈화라고 한다. 이렇게 하면 각각의 클래스나 함수에서 사용하는 객체들이 전역스코프를 갖지 않기 때문에 관리하기에 수월하다.
   - 모듈화를 하지 않고 구현할 수 있는 방법이 있다는 게 더 놀랍다. 어떻게 하는 건지 잘 모르겠다.
  
- 웹팩을 설치해서 webpack.config.js 파일에 모듈 룰과 플러그인을 넣어보다가 보류 
- 리뷰에서 추천받은 parcel 번들러를 시도해보기로 함 (https://parceljs.org/getting_started.html )


```
npm install -g parcel-bundler

parcel index.html
parcel watch index.html

```

- index.css 에서 사용하는 @import 가 인식되지 않는 문제가 있음

<br/>

#### youtube api 쿼리 패턴 파악

```typescript
const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&order=viewCount&q=skateboarding+dog&type=video`

```

- [youtube data api](https://developers.google.com/youtube/v3/docs/search/list?apix=true&apix_params=%7B%22part%22%3A%22snippet%22%2C%22order%22%3A%22viewCount%22%2C%22q%22%3A%22skateboarding%20dog%22%2C%22type%22%3A%22video%22%2C%22videoDefinition%22%3A%22high%22%7D)
  
  - part: ( string ) - id / snippet
    
    - snippet 속성은 결과의 제목, 설명 등을 식별하는 다른 속성을 포함한다. 
    - id 속성은 id 속성만을 포함한다. 
  
  - order: ( string ) - date / rating / relevance / title / videoCount / viewCount
    
    - default : SEARCH_SORT_RELEVANCE (relevance)
    - 정렬기준 설정
  
  - q: ( string )
  
    - 검색어 설정
  
  - type: ( string ) - channel / playlist / video
  
    - 리소스 유형 설정

<br/>

#### 검색어를 받아서 파싱하기 

- input 처리하는 함수 (클래스) 모듈화해서 임포트해서 사용하기
- 띄어쓰기 처리를 따로 안 해도 될 것 같음

#### 검색결과 UI 모듈화 하기

- html 파일을 모듈로 나누어서 임포트시켜보기
