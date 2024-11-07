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

7강. 리액트 라우터 3: URL 파라미터로 상세페이지 100개 만들기
Detail.js에 App.js에 있는 데이터 받아와서 상세페이지에 상품명 넣기 진행
전송해보자 .
Detail 컴포넌트에 props를 전달 > {props.shoes[0].title} 식으로 받아와서 사용

[질문]Detail안에 shoes라는 state 더 만들면 편하지 않을까?
[답변]복사본을 데이터 하나 더 만들어 두면 두곳을 수정해야하므로 관리하기가 귀찮아서 이렇게 하면 안됨

> 상세페이지를 만들긴 했는데 0번째 상품것만 만듦
> 물론 경로를 /detail1 /detail2 /detail3만들어서 다 하나씩 만들면 되긴함
> 다른 사이트를 reference해보자. > 해보니 각각의 id를 받아서 활용하는 것을 관찰함
> /detail/0 /detail/1 /detail/2 이런식으로 해보려함
> 상품100개인 경우에도 활용하고 싶음
> URL 파라미터 문법을 활용
> <Route path="/detail/:id" element={<Detail shoes={shoes} />} /> 이렇게 작성 :id
> 페이지는 여러개 인데 보이는 내용을 다르게 하고싶다면?
> props 활용하면 컴포넌트 1개로 각각 다른내용이 가능
> /detail/0로 접속하면 0번째 상품이 보이도록 코딩
> How? useParams()이용하면 가능 ( 구글 검색으로 찾아야함 )

> let {id} = useParams();
> 현재 유저가 URL파라미터에 입력한거를 가져오기위해 사용
> 즉, id자리에 적은걸 가져와준다.
> /1의 자리에 나온걸로 접속하면 1로 됨
> URL파라미터에 이상한거 입력하면? -> if문으로 에러처리 진행
> id라는 변수가 이상하면 상품이 없다는 UI를 보여주면 된다.
> [참고] URL 파라미터 만들때 여러개가 가능
> ex)<Route path="/detail/:id/:dwe/:adwcc" element={<Detail shoes={shoes} />} />
> [문제] 상품이 정렬이 되면? => 상세페이지가 이상해짐
> -> state가 변경됨 -> 이 상태에서 /detail 0으로 접속했을 때 0번째 상품이 바뀌어있어서 다른 상품으로 나올 수 있을 거 같음 -> 상품명이 바뀌게 됨
> -> 0으로 접속했을때 0번째 상품을 보여주는 것이 아니라
> id가 0인 상품을 보여주도록 하는 방법을 구안해내라는 것
> [힌트] Detail.js에 데이터바인딩할 때 0번째 상품의 제목을 여기 보여주세요~라고 썼는데 상품의 영구번호가 0인 상품의 제목을 여기 보여주세요~하면 되지 않을까
> -> 영구 번호는 shoes라는 상품 데이터안에 {id:0}이런 식으로 함께 저장되어 있다
> => 따라서 현재 url에 입력한 번호와 같은 값을 가진 상품을 찾아서 데이터바인딩 해달라고 코드를 짜면 끝
> let 찾은상품 = props.shoes.find(function(x){

    return x.id == id

});
이렇게 데이터바인딩을 진행한 후 ,

  <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p> 이런식으로 표현식을 만들어 출력하면 문제가 없어질 것이다.

7강. styled-component
[요약정리] 이쁜 버튼을 만들고 싶으면?
[지금] <button className="??"> CSS파일 가야함
[styled-components] JS파일에서 전부 해결이 가능

설치) npm install styled-components
Detail.js) import진행 > styled.button`버튼스타일지정`; > let YellowBtn = styled.button`  background: yellow;
  color: black;
  padding: 10px;`;
이자리는 컴포넌트를 작명해주기때문에 대문자로 쓰고 사용해주면 됨

[장점1] CSS파일 안열어도 됩니다
[장점2] 스타일이 다른 js파일로 오염되지 않음
(나중에 build할 시에 오염될 수 있음 섞여서)
(사실 작명을 잘하면 되긴함 App.module.css 의존성추가가능 Detail.js 는 Detail.module.css 만들면 거기에만 종속하게 가능)
[장점3] 페이지 로딩시간이 단축됨
홈페이지 구동에 필요한 로딩시간만으로 단축됨

[문제] Q.옐로우버튼을 이미 만들어 놨었는데, 오렌지색버튼이 필요하다면? -> props문법을 쓰면 됨.
약간 씩 다르게 사용할 수 있음
가변적인 부분을 ${}로 뚫어놓고,
let YellowBtn = styled.button`  background: ${(props) => props.bg};
  color: black;
  padding: 10px;`;
이런식으로 props 설정해서 받아올 수 있도록 함,
이후 부모컴포넌트에서 받아옴 <YellowBtn bg="blue">버튼</YellowBtn>
받아온 부분을 자식컴포넌트가 받아 뿌려줌
즉, props만 살짝씩 바꿔주면 다른 색의 버튼을 만들 수 있음
(props) => props.bg부분은 이해보다는 그냥 방식이라 외워요.
[참고] 버튼의 글자 색상을 밝게 하고싶다? -> 조건문을 추가하자.
color: ${(props) => (props.bg == "blue" ? "white" : "black")};
ㄴ 이런식으로 간단한 프로그래밍 기능 추가 가능
[참고] 기존 스타일의 복사를 가능
let NewBtn = styled(YellowBtn)`커스터마이징 가능`;
[단점1] JS파일이 매우 복잡해짐
[단점2] 중복스타일은 컴포넌트간 import할텐데 그러면 CSS와 다를바가 없군
[단점3] 협업시에 CSS담당자가 있을시 숙련도 이슈가 있을 수 있음

8강. Lifecycle 과 useEffect 1
컴포넌트의 Lifecycle?
컴포넌트도 사람처럼 태어나서 죽는 생명주기
Detail 페이지를 들어갔을 때 페이지에 장착되기도 하고(mount)
가끔 업데이트도 되고 (update)
필요없으면 제거되는 (unmount)여러가지 과정을 얘기함
[참고]왜 알아야하나? 중간중간 간섭이 가능 \*간섭: 코드 실행
컴포넌트가 업데이트가 될때 중간중간에 특정 코드를 실행시킬 수 있음
How? 갈고리를 걸어 실행할코드를 적을 수 있음
만약 mount에 걸어주면 그떄 실행하고 update에 갈고리를 걸면 그때 실행하도록 도와줌

예전 클래스형 컴포넌트에선
class Detail2 extends React.Component {
componentsDidMount(){} //컴포넌트 mount시 실행됨
componentDidUpdate(){} //
componentWillUnmount(){} //
}

요즘 컴포넌트 훅을 사용 (import해와야함)
useEffect(() => {}) // 이안에 적은 코드는 mount,update시 여기 코드가 실행되도록 해줌

useEffect(() => {
console.log("안녕");
});
이렇게 하면 안녕이 마운트될때 뜨는 것을 알 수 있음
[참고] 2개이상뜨는 경우가 많이 발생함: 실제 deploy하면 한 번 밖에 뜨지 않음 (디버깅을 위해 원래 그럼)
=> 1개만 뜨게 하고싶다면 <React.StrictMode>없애주면 됨
update될때 실행이 되는지 어떻게 파악?
let [count , setCount] = useState();
버튼을 만들어 클릭때마다 count가 update되도록 코드수정하고 보면, 콘솔창에 안녕이 클릭할 때마다 찍히는 것을 알 수 있다.
[참고] Q.
useEffect(() => {
});
console.log("안녕");
그냥 이렇게 바깥에 넣어도 똑같은데??
[useEffect쓰는이유]
useEffect의 동작원리 : 실행 시점이 약간 다름
안에 적힌 코드는 랜더링이 다 돼서 그제서야 실행이 됨
즉 html 렌더링 후 동작함

예시 ) 복잡한 연산을 시킨 후
useEffect(() => {
});
for (var i = 0; i < 10000; i ++) {
console.log(1);
}
반복문 부터 실행하는 js ( 2초넘게 걸림) > html이 나중에 실행됨

하지만 이렇게 오래걸리는 작업을 useEffect안에 넣으면
useEffect(() => {
for (var i = 0; i < 10000; i ++) {
console.log(1);
});
}
[point]useEffect안에 있는 코드는 html랜더링 후에 동작할 수 있도록 해줌
조금더 html을 먼저 보여주고 어려운 작업을 실행할 수 있도록 해서 사용자들에게 좋은 UX를 줌

[사용]
useEffect는 즉 시간이 많이 걸리는 어려운 연산때 사용
서버에서 데이터를 가져오는 작업을 여기에서 많이 사용
타이머를 장착하는 것도 여기서 작업

[참고] Q. 왜 이름이 useEffect임
프로그램 쓸때 Side Effect라는 개념이 있음
함수의 핵심기능과 상관없는 부가기능이라는 개념인데
여기서 개념을 따온 것임
즉 Side Effect 코드들을 보관하는 함 개념이라는 것임

[참고] setTimeout(() => {실행할코드}, 1000);
타이머 주는 문법 1000는 1초개념

9강. Lifecycle 과 useEffect2
[문제] Detail방문시 2초후 <div>사라지게

1. useEffect(() => {setTimeout(()=> {}, 2000)})
   (안에 <div>안보이게 처리해주세요는 js방식, 리액트방식은 스위치조작해주세요임)
   즉 스위치를 만들어야함 = UI상태를 저장할 state를 만들고
   state따라서 UI가 어떻게 보일지 작성해주면 됨

let [alert, setAlert] = useState(true);

[참고] useState는 배열을 반환하므로 배열 구조분해 할당을 사용해야함

2. useEffect(() => {setTimeout(()=> { setAlert(false)}, 2000)})

3. useEffect(() => {setTimeout(()=> { setAlert(false)}, 2000)}, []) 이렇게 추가해야 더 정확함
   useEffect실행조건 넣을 수 있는 곳은 []임
   ex) [count]로 집어넣으면 ( dependency추가 )
   mount, update시 실행되는데 count라는 변수가 update될 떄만 useEffect가 실행된다는 것임
   mount시와 count가 변경될 때만 실행됨
   console.log(1) + count변수 만들어서 업데이트 될 때 체크해봄
   [참고] 편법인데, [] 즉 dependency가 없게 해놓으면 update가 실행되지 않음 재랜더링되어도 코드가 재실행되지 않음을 알 수 있음
   즉 , 컴포넌트가 장착될때 mount될 떄만 코드가 한 번만 실행됨 = 즉 효율적인 타이머를 만들 수 있음
   [참고] return 을 추가 할 수 있음
   return () => {

}
이부분은 useEffect 동작 전에 실행이 되는 함수들을 적어 놓으면 실행이 됨
이부분의 별명 : cleanup function
2초가 넘어가고 나서 cleanTimeout(timer) 이렇게 코드를 짜면 타이머가 이후 없어지게 됨

타이머를 하나 만들게되면 진짜 타이머가 생성됨 -> useEffect에 타이머를 만들면 재랜더링이 계속됨 그러면> 타이머가 100개 1000개가 만들어 질 수 있음 > 그래서 기존 타이머는 제거 해주세요 라고 return에 적음 > 내가 꼭 필요한 타이머 하나만 장착할 수 있기 때문에 쓸데없는 비효율적인 코드를 제거할 수 있음

[참고]응용할 수 있는 분야 : 데이터 요청하는 코드
2초 3초정도 걸림 > 2초 데이터를 가져오는 도중에 재렌더링이 됨 > 요청이 끝나질때쭘에 또 재랜더링하면 많아져 오류를 불러일으킴 > 그래서 기존 데이터 요청은 제거해주세요 라는 cleanup function을 사용해주면 된다.

[참고]clean up function은 mount시 실행이 안되고, unmount시에만 실행이 됨 ( 다른 페이지로 넘어가거나 detail페이지를 빠져나왔을 때)

[useEffect정리] 어떤식으로 사용하면 되나?

1. 재랜더링마다 코드 실행하고 싶다면 useEffect(() => { 실행할 코드
   });
2. mount시 1회 코드 실행하고 싶다면 useEffect(() => { 실행할 코드
   }, []);
3. unmount시 1회 코드 실행하고 싶다면 useEffect(() => { return() => {실행할 코드}
   });
4. useEffect 실행전에 뭔가 실행하려면 언제나 return() => {실행할 코드입력}
   (가끔 가다 useEffect를 싹 비워놓고싶어서 clean up function을 실행시키고 싶을때 return문에 코드입력)
5. 특정 state변경시에만 실행하려면 [state명] 집어넣자.
   useEffect(() => {실행할 코드입력},[count]); 변경될때, 처음 랜더링할때 실행됨

10강 상품 더보기
AJAX를 이용해 받아올 것임 
상품 더보기 버튼을 설치할 것임
[배경지식] 서버에 데이터를 요청할 건데...
[서버]데이터를 부탁하면 진짜로 들어주는 프로그램
ex)유튜브 서버는 동영상 요청하면 동영상을 가져다주는 프로그램
그래서 서버개발시에 누가 A요청하면 A를 주세요 - 근데 규격이 있어야함
1방법(GET/POST) 2어떤자료(URL)적어보내라고 함 
ex) GET요청 하면 서버가 동영상을 보내줌
ex) 글을 작성하고싶음 - POST요청 하면 글이 업로드가 됨
URL경로는 서버가 알려줌
서버에 get요청을 해서 받아오도록 해보자.

서버주소:
https://codingapple1.github.io/shop/data2.json

[참고]주소입력하는 공간 = GET요청을 날릴 수 있음 
즉 위 주소를 주소입력공간에 붙여넣으면 받은 것을 확인 할 수 있음 

ajax를 사용해도 GET요청이 가능
차이점: GET/POST 요청시에 새로고침이 됨   => ajax는 새로고침 없이도 GET/POST요청이 가능

1. <button onClick={() => {
        //ajax 요청
        
      }}>버튼</button>
   요청부분 코드를 짤 것임
[참고] ajax쓰려면 옵션 3개중 택1   1. XMLHttpRequest   2. fetch()  3.axios 같은거
사람들이 많이쓰는 외부 라이브러리로 요청시도해보자
터미널) npm install axios >  App.js) import axios from "axios" > get요청 ㄱㄱ ( axios.get() )
2.  ajax이용한 get요청은 axios.get('url')
        axios.get('https://codingapple1.github.io/shop/data2.json')
3. .then((data)=>{ data}) 을 바로 옆에 붙여서 서버에서 data로 데이터를 받아오게 됨 
4. 일단 할 거 없으면 console.log(data)를 안에 넣어보자.
   axios.get('https://codingapple1.github.io/shop/data2.json').then((data)=>{ console.log(data)})
(콘솔창을 확인해보면 버튼을 누르면 받아와지는 것을 확인해볼 수 있음 ) 전체적인 데이타가 다보이게 됨 > 실질적인 데이타만 보고싶다면 ? 
axios.get('https://codingapple1.github.io/shop/data2.json').then((data)=>{ console.log(data.data)}) 즉 data.data해주면됨
그러면 데이터 배열만 볼 수 있음 ( 실무에서는 data.data 보단 then((result) => { result.data })) 이런식으로 많이 한다고함
5. 마무리) 새로고침없이 get/post요청이 가능해서 리액트에선 거의 서버와 ajax 이용해서 통신합니다 
6. [참고]Q. ajax요청 실패한 경우?
.catch(() => {console.log('실패함') }) 으로 실패를 잡아줘야함 

11강 데이터 가져와서 html로 보여주기
쌩 자바스크립트는 html만들어주세요~ 이렇게지만 리액트는 스위치를 조작함
shoes라는 state를 조절하면 그에 맞게 컴포넌트 생성이 될 것임 
즉, shoes라는 state에 데이터를 추가만 해준다면 알아서 컴포넌트 6개가 생성될 것임
        .then((result)=>{ console.log(result.data)
        // shoes에 가져온 데이터를 추가해줘요
        console.log(shoes); 
        // [ {}, {}, {}, {}, {}, {}] 으로 되도록해야함 concat방법이 있음 또는
        let copy = [...shoes, ...result.data];
        console.log(copy);
        setShoes(copy)
      })
이런식으로 setShoes를 활용해 복사본을 다시 넣는 방식으로 진행 
[응용1]버튼 2회 누를 때는 7,8,9번 상품 가져오러면? (버튼 누른 횟수를 저징시키는 방법으로 정리하면 될듯)
[응용2]버튼 3회 누를 때는 성품이 더 없다고 말해주기 (조건문을 활용)
[응용3]버튼 누르면 로딩중입니다 글자 띄우기 ( axios.get함수 이전에 로딩중UI띄우기함수 axios.get()  로딩중UI숨기기함수 이런순으로 하면 될듯 + catch에도 로딩중UI숨기기함수를 추가해야할듯 왜냐면 중간에 자료가 안받아졌을때를 생각해야하기때문 - finally쓰면 안되려나? )

ajax요청에 대한 추가적인 부분
서버에 전송할때 POST요청을 진행 (서버로 보낼때 )
ex) axios.post('/eqcssq(url부분)', {name: 'kim'}(데이터))  자유롭게 객체자료형을 보낼 수 있게 됨
실제로 받아올 서버는 없기 때문에 가져다 쓰기만 하면 됨
[참고] 동시에 ajax요청하려면 axios.get('/url1')   axios.get('/url2')을 동시에 요청?
Promise.all([ axios.get('url/1'),axios.get('/url2')]) 동시에 get요청을 보낼 수 있음
그리고 이게 다 전부다 성공했을 경우에 안에있는 코드를 실행시키고 싶다면 .then()을 똑같이 붙이면 됨 
[물론] axios.get('/url1')   axios.get('/url2') 나란히 써도 되겠지만 다 성공했을 때 실행하게 해주세요가 어려움 

[참고] 서버랑 데이터를 주고받을때 무조건 문자만 주고받을 수 있습니다. - 방금 서버에서 array온거 같은데 무슨소리??
"{"name":"kim"}" 이렇게 따옴표 쳐놓으면 문자로 인식-> 배열 객체도 주고받기가 가능해짐 <-일명 JSON (문자취급을 받을 수 있어서 편리함)
즉, data를 처음 받았을 때 JSON형식으로 받아옴 -> 이것을 axios가 자동으로 array로 바꿔준 것임 

[참고]fetch()
그냥 JS기본 문법으로도 GET요청가능 (기본 라이브러리 문법)
하지만 .then(result => result.JSON())   .then( data=> {}) 이런식으로 코드를 추가해줘야함 
fetch로 데이터를 가져오면 그대로 JSON만을 출력해주기 때문에 array로 바꿔줄 코드가 필요한 것임 -> 그래서 axios가 편한 것임
