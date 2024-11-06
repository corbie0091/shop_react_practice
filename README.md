### 쇼핑몰 프로젝트

1강. Bootstrap라이브러리
: 레이아웃을 복사붙여넣기식으로 편하게 개발가능
구글에 reactbootstrap 검색 > 사이트 > 외부라이브러리 > Get started > 방법대로 해주면 됨 > 터미널 > npm install react-bootstrap bootstrap 해주면 됨
( 이런 것들은 매일 바뀔 수 있기 때문에 직접 사이트 검색해서 확인하고 설치하는 것이 중요 )

> [설치] bootstrap은 CSS파일도 넣으라 해서 그것도 넣어보자. ( App.js파일에서 import해오기 혹은 index.html에 <link>태그로 가져오기 )
> [활용] 버튼을 가져오고 싶다? 사이트에서 button검색 > 버튼 예제중 > 원하는 버튼 코드 복사 > 붙여넣기 > Button은 (대문자) 컴포넌트 이므로 > import 코드 적기 > React App 페이지보면 버튼나와있음 > 동적 UI도 이렇게 생성 가능 > Navbar도 완성 >
> [참고] 물론 이대로만 쓰는거 아니고 className으로 설정해서 CSS로 커스터마이징도 가능

2강. 이미지 넣는 법 & public 폴더 이용하기
A.이미지를 불러오자.
case1] CSS파일에서 src안의 이미지를 넣고싶으면 ? > 그냥 >
./bg.png 이런식으로 경로 넣어주면된다.
App.css)
.main-bg {
height: 300px;
background-image: url("./bg.png");
}
이후 css설정
case2] img파일을 만들어서 거기에서 가져오려면 경로 설정 수정필요하다. > ./img/bg.png

case3] import 작명 from "./img/bg.png" 로 불러오고
이를

<div className="main-bg" style={{ backgroundImage: `url(${bg})` }}></div> 
이렇게 가져올 수도 있다. js에서 변수를 적용시키려면 역따옴표(``)를 사용해서 ${} 사용하고 그안에 변수를 입력해주자. 
[참고] 하지만 이렇게 하면
html에서 src폴더 이미지 100개면 어쩌지? -> import도 100개???
리액트는 사이트발행전에 html css js 파일을 압축함 (bundling) 하지만 public 폴더 안의 파일은 압축되지 않음
그래서 html에서 public 폴더>이미지 경로 사용하면 됨
public폴더 > 이미지 보관이 가능 > /이미지경로 이렇게 사용 ? 
[주의점] 이렇게 사용하면 서브경로에 발행하고싶을때 문제가 생길 수 있음 => 그래서 경로 수정해줘야함 > create-react-app 라이브러리 공식사이트에서 확인 > 
<img src={process.env.PUBLIC_URL + "/img/logo.png"}>
이렇게 사용 ( = 이게 public폴더 이미지 쓰는 권장방식)
ex) <img
              src={process.env.PUBLIC_URL + "/col-mg1.jpg"}
              width="80%"
              height={"110px"}
            />

case4] 외부에 호스팅해둔 이미지라면 이미지 절대주소만 넣어줘도 된다.
B. 상품 레이아웃 3개를 만들어보자. - Bootstrap으로 할 것임
Bootstrap - grid 활용해도 됨

3강. 서버에서 데이터가져와서 불러오기
일단 없으므로 변수를 state형태로 저장해놓아서 연습해보자.
하지만 useState에 바로 넣기에는 object가 크기 때문에 다른 js파일에 넣어두고 이를 활용하기로 해보자.
data.js 파일 생성 > export import문법 사용해야함 >
[참고 예시]
let a = 10;
export default a;
이렇게 변수를 export하고 App.js파일에서 사용하고 싶다면
import a from "./data.js"해주면 사용 가능하다.
즉 파일간 변수공유가 가능하다( 복사 개념 )
[참고 예시2]
여러 변수를 참고 하고싶다면?
let a = 10;
let b = 100;
export { a, b }
이런식으로 해주면 된다 .
import { a, b, c } from "./data.js" 이렇게 해주면 된다.
[참고] 컴포넌트도 export가능
*숙제1: 상품목록 컴포넌트화
*숙제2: 상품명 데이터바인딩도 잘 해오기 \*숙제3: 반복적인 부분은 map반복문 써보기

[숙제시 어려웠던 점]
let 변수 = [{}, {}, {}]을 map함수로 뿌릴때, 이를 컴포넌트화시켜 코드를 간결하게 짜고싶었는데 그러지 못했다.
이유: map함수 안에서 JSX를 변환하지 않고 {}중괄호만을 사용했던 점
해결방법: map함수 안에서 바로 JSX를 반환해야 랜더링이됨

해결전:
{shoes.map((shoes) => {
<Container2 shoes={shoes}></Container2>;
})}
해결후:
{shoes.map((shoes) => (
<Container2 shoes={shoes} key={shoes.id}></Container2>
))}

정리: map함수를 쓸때 안에 JSX를 반환해야한다.
그래서 {}대신 return{}키워드를 사용하거나, ()괄호로 JSX를 감싸서 반환하면 된다.

[다른 풀이코드]
{shoes.map((a,i) => (
<Card shoes={shoes[i]} i={i+1}></Card>
))}
[숙제시 궁금했던 점]

<div key={props.shoes.id} className="col-md-4">
key값을 분명 코드를 짰지만 html에서 보이지 않아 궁금했다.
검색후:
이는 정상적인 모습으로 key가 누락되었거나 고유하지 않으면, 경고메시지가 나타났을 것으로, 경고가 표시되지 않고 있다는 것은 key값이 잘 설정되어 있다는 반증이 되기도 한다는 것이다. 
+ 검사를 하고싶다면 콘솔창을 확인해보자
console.log("Key:", props.shoes.id); // in 컴포넌트(props)

5강. 여러 페이지 만드는 방법 -상세페이지 -장바구니페이지

근데 이전에 다른 사이트 확인해보며 어떤 페이지가 있는지 파악 (naverVIBE)
파악해보니
/chart
/magazines 이런식으로 URL마다 페이지를 구분해놓음

우리도 이렇게 해보자!
/detail로 접속하면 상세페이지보여주고
/cart로 접속하면 장바구니페이지 보여주고
...

페이지 나누는 법(리액트 미사용)
1.html 파일 만들어서 상세페이지 내용 채움 2. 누가 /detail로 접속하면 html파일을 보여줌

페이지 나누는 법 (리액트 사용)
SPA로서 index.html만 보여줌

1. 컴포넌트 만들어서 상세페이지 내용 채움
2. 누가 /detail접속하면 그 컴포넌트 보여줌
   (참고로 컴포넌트 우리가 짤 수 있지만 도와주는 라이브러리를 사용할 것임 )

[참고] react-router-dom 사용하면 편리함
[참고] 설치방법은 항상 사이트 참고해서 설치해야함

1. npm install react-router-dom
2. index.js > <App/>을 <BrowserRouter></BrowserRouter>로 감싸야함
3. import 필수

[참고] import할 때 ./~ 이렇게 된건 내가만든 js파일들에서 가져온 것
[참고] import할 때 react-router-dom 이런건 대부분 설치한 라이브러리임
[참고] 외부 라이브러리는 필요할 때 마다 검색해서 써주면 됨 4. App.js > import { } from "react-router-dom" >
{}안에 Routes, Route, Link 를 집어넣자. >
App return 문 안에 <Routes>
<Route path="/" element={<div>메인페이지임</div>} />
<Route path="/shop" element={<div>옷페이지임</div>} />
<Route path="/about" element={<div>어바웃페이지임</div>} />
</Routes> .. 집어넣자 >
Q. 상품목록은 메인페이지에만 보여주고 싶은데? > <Route path="/" element={}> {}중괄호 안에 상품목록을 넣어주면 되지 않을까? > 그래서 페이지도 컴포넌트로 축약해놓으면 좋음 5. 일반 유저들 > 페이지이동을 하는 방법? > 버튼으로 진행함 > 페이지 이동 버튼을 부여해보자.
페이지 이동버튼은 <Link>태그를 가져다 쓰자

    > 이런 식으로 페이지 이동 버튼을 지정해주면 된다.

          <Link to="/">홈</Link>
          <Link to="/shop">옷페이지</Link>
    > 이부분을 Nav태그 부분을 채워놓으면 될듯하다.
    > 나머지 디자인 적인 부분은 알아서 해오도록.

[숙제]

6강. 리액트 라우터2 : navigate, nested, routes, outlet

[참고]리액트 폴더 구조? = 비슷한 파일끼리 폴더로 묶는게 끝임

routes폴더 생성하고 > Detail.js 이런식으로 페이지 만들면 여기에 집어 넣자.
[주의] 파일 경로가 바뀌면 import경로도 다 확인해주자.

[경고]
{

1. ESLint 경고 : Button' is defined but never used
   사용하지 않는 변수나 import는 불필요한 코드로 간주되기 때문에, ESLint는 이를 제거할 것을 권장
2. ESLint 경고 : img elements must have an alt prop
   접근성 규칙에 따라 <img> 태그에는 항상 alt 속성이 있어야 한다. (시각장애인을 위한 접근성 향상)
3. babel-preset-react-app 관련 경고 :
   abel-preset-react-app에서 @babel/plugin-proposal-private-property-in-object라는 패키지를 암묵적으로 사용하고 있지만, 이 패키지가 종속성에 선언되지 않아 경고가 발생
   이 문제는 create-react-app이 더 이상 유지보수되지 않기 때문에 수정되지 않을 가능성이 크다 따라서
   npm install --save-dev @babel/plugin-proposal-private-property-in-object 을 입력해 devDependencies에 추가하면 된다.
   }

1) 페이지 이동 도와주는 useNavigate()
   import { Route, Routes, Link, useNavigate, Outlet } from "react-router-dom"; 이런식으로 App.js에 import
   useNavigate()는 훅 이자 함수.
   let navigate = useNavigate();이런식으로 변수에 함수를 저장하는 식으로 저장
   페이지 이동하는 것을 쉽게 할 수 있음
   페이지 이동 이전) Link태그는 a태그느낌으로 사용함 하지만
   페이지 이동 지금)
   <Nav.Link
   onClick={() => {
   navigate("/community");
   }} >
   COMMUNITY
   </Nav.Link>
   이런식으로 onClick()안에 함수를 집어넣어서 적용

2) 404페이지 경로 : \_를 해주면 else문과 같이 적용 <Route path="\*" element={<div>404페이지입니다</div>} /> 즉 없는 페이지를 알려주기 위함

3) Nested Routes
   예를 들어 /about 페이지에서 /about/member 페이지도 만들고 /about/location 페이지도 만들어주고 싶음
   그러면 Route를 여러개 만들어주면 됨
   <Route path="/about" element={<About />}/>
   <Route path="/about/member" element={<About />}/>
   <Route path="/about/location" element={<About />}/>
   근데 이런식말고 Nested Routes문법으로 같은 페이지를 만들어 줄 수 있음
   <Route path="/about" element={<About />}
   <Route path="member" element={<div>맴버임</div>}/>
   <Route path="location" element={<div>location</div>}/>
   </Route>
   태그안에 태그가 들어간 모양임
   누가 /about/member로 들어오면 member 거기로 보여주세요 이런 느낌임 ( 장점: route 작성이 간단해짐, nested route 접속시엔 element 2개나 보임)
   [참고] 위에 이렇게 짜고 주소에 작성해도 안보임
   why? 어디에 보여줄지 작성해야하기 때문임 > 어디보여줄지 정하려면 About컴포넌트안에서 Outlet 을 사용하면 된다.
   About안에 member를 어떻게 보여줄건지 할 거면 Outlet을 작성해 보여주면 된다.
   [참고] Q.nested routes 언제 쓸까?
   - 여러 유사한 페이지가 필요할 때,
   - 차이점이 별로 필요없을 때
   - 박스 하나만 살짝씩 바뀌게 될 때 ( 일부만 변경할 때 )
4) 라우터의 장점:
   - 뒤로가기 버튼이 잘먹음
   - 페이지 이동이 쉽게됨 ( UI스위치 조작이 쉬움 )
