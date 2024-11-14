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
차이점: GET/POST 요청시에 새로고침이 됨 => ajax는 새로고침 없이도 GET/POST요청이 가능

1.  <button onClick={() => {
    //ajax 요청
    }}>버튼</button>
    요청부분 코드를 짤 것임
    [참고] ajax쓰려면 옵션 3개중 택1 1. XMLHttpRequest 2. fetch() 3.axios 같은거
    사람들이 많이쓰는 외부 라이브러리로 요청시도해보자
    터미널) npm install axios > App.js) import axios from "axios" > get요청 ㄱㄱ ( axios.get() )
2.  ajax이용한 get요청은 axios.get('url')
    axios.get('https://codingapple1.github.io/shop/data2.json')
3.  .then((data)=>{ data}) 을 바로 옆에 붙여서 서버에서 data로 데이터를 받아오게 됨
4.  일단 할 거 없으면 console.log(data)를 안에 넣어보자.
    axios.get('https://codingapple1.github.io/shop/data2.json').then((data)=>{ console.log(data)})
    (콘솔창을 확인해보면 버튼을 누르면 받아와지는 것을 확인해볼 수 있음 ) 전체적인 데이타가 다보이게 됨 > 실질적인 데이타만 보고싶다면 ?
    axios.get('https://codingapple1.github.io/shop/data2.json').then((data)=>{ console.log(data.data)}) 즉 data.data해주면됨
    그러면 데이터 배열만 볼 수 있음 ( 실무에서는 data.data 보단 then((result) => { result.data })) 이런식으로 많이 한다고함
5.  마무리) 새로고침없이 get/post요청이 가능해서 리액트에선 거의 서버와 ajax 이용해서 통신합니다
6.  [참고]Q. ajax요청 실패한 경우?
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
[응용3]버튼 누르면 로딩중입니다 글자 띄우기 ( axios.get함수 이전에 로딩중UI띄우기함수 axios.get() 로딩중UI숨기기함수 이런순으로 하면 될듯 + catch에도 로딩중UI숨기기함수를 추가해야할듯 왜냐면 중간에 자료가 안받아졌을때를 생각해야하기때문 - finally쓰면 안되려나? )

ajax요청에 대한 추가적인 부분
서버에 전송할때 POST요청을 진행 (서버로 보낼때 )
ex) axios.post('/eqcssq(url부분)', {name: 'kim'}(데이터)) 자유롭게 객체자료형을 보낼 수 있게 됨
실제로 받아올 서버는 없기 때문에 가져다 쓰기만 하면 됨
[참고] 동시에 ajax요청하려면 axios.get('/url1') axios.get('/url2')을 동시에 요청?
=> Promise.all([ axios.get('url/1'),axios.get('/url2')]) 동시에 get요청을 보낼 수 있음
그리고 이게 다 전부다 성공했을 경우에 안에있는 코드를 실행시키고 싶다면 .then()을 똑같이 붙이면 됨
[물론] axios.get('/url1') axios.get('/url2') 나란히 써도 되겠지만 "다 성공했을 때 실행하게 해주세요"가 어려움

[참고] 서버랑 데이터를 주고받을때 무조건 문자만 주고받을 수 있습니다. - 방금 서버에서 array온거 같은데 무슨소리??
"{"name":"kim"}" 이렇게 따옴표 쳐놓으면 문자로 인식-> 배열 객체도 주고받기가 가능해짐 <-일명 JSON (문자취급을 받을 수 있어서 편리함)
즉, data를 처음 받았을 때 JSON형식으로 받아옴 -> 이것을 axios가 자동으로 array로 바꿔준 것임

[참고]fetch()
그냥 JS기본 문법으로도 GET요청가능 (기본 라이브러리 문법)
하지만 .then(result => result.JSON()) .then( data=> {}) 이런식으로 코드를 추가해줘야함
fetch로 데이터를 가져오면 그대로 JSON만을 출력해주기 때문에 array로 바꿔줄 코드가 필요한 것임 -> 그래서 axios가 편한 것임

12강 Tab 만들기
상세정보 / 리뷰 / Q & A / 반품/교환정보 등의 탭을 만드는 것임
이와 같이 탭만들어보기
탭UI만들기 - 그냥 모달창 3개 있다고 생각하면 됨

1. html css로 미리 디자인
   그냥 <button>으로 해놓으면 멋이 없음 .. 리액트 부트스트랩에 들어가서 Nav라고 검색해서 복붙 ㄱㄱ

<Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0">NavLink 1 content</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1">NavLink 2 content</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2">NavLink 3 content</Nav.Link>
        </Nav.Item>
      </Nav>
Nav라는 태그를 쓸때 
[유의점] 버튼마다 eventKey를 써야함 (다르게 작명)
defaultActiveKey 처음 기본으로 눌려있을 버튼을 정함 ( eventKey중에 아무거나 집어 넣으면 됨 )

2. 이후 탭의 내용들도 <div></div>태그로 해놓으면 됨
<div>내용1</div>
<div>내용2</div>
<div>내용3</div>

3. 탭 상태 저장해둘 state필요
   let [ tab, setTab] = useState(0) <- 0번째 내용 보이는 상태
   초기 값은 0 으로 해놓으면 좋을듯
   (즉, 탭 UI조작 스위치 완성임)

4. state에 따라서 UI가 어떻게 보일지 작성
   state가 0이면 내용1이보이고 state가 1이면 내용2가 보이고 ... 이렇게 조건문을 걸어주면 됨
   {tab == 0 ? <div>내용1</div> : null}
   {tab == 1 ? <div>내용2</div> : null}
   {tab == 2 ? <div>내용3</div> : null}
   이렇게 삼항연산자를 여러개 걸어줘도 되긴함.
   하지만 이렇게하면 코드가 복잡해보임

5. 함수형 컴포넌트를 밖에 만들고 그 컴포넌트를 Nav버튼 밑에 두게끔 리턴문에서 사용
   function TabContent(props) {
   if (props.tab === 0) {
   return <div>내용1</div>;
   } else if (props.tab === 1) {
   return <div>내용2</div>;
   } else if (props.tab === 2) {
   return <div>내용3</div>;
   }
   }
   [주의] TabContent(tab)으로 하는게 아니라 (props)로 받고 이를 props.tab으로 안의 조건문들을 완성시켜야함
   [주의] 그리고 <div>태그로 html보여줄때 return문을 걸어야함
   [팁1]props. 어쩌구가 귀찮으면 props의 축약버전으로 {tab} 이렇게 하면 tab으로 바로 쓸 수 있음.
   2개라면 {tab, tab2}이런식으로 받을 수 있음

<TabContent tab={tab} /> 이런식으로 설정

6. 이후 onClick으로 setTab에 변수를 변경시키면
   <Nav.Link
   onClick={() => {
   setTab(1);
   }}
   eventKey="link1" >

7. 버튼을 클릭할 때마다 변경이 되는 모습을 볼 수 있음

[팁2]-편법 센스 좋으면 if문 필요없을 수도
function TabContent({tab}) {
return [<div>내용1</div>, <div>내용2</div>, <div>내용3</div>][tab]
}
array자료형으로 밀어넣고
tab이라는 state가 0이면 내용1이 보이고
2이면 내용3이 보이도록 할 수도 있음

13강 Context API (props가 싫으면..)
Single Page Application단점:
컴포넌트간 state공유가 어려움
예를 들어 function About() {} function Card() {} 이렇게 같은 파일에 2개 컴포넌트 있으면 공유가 어려웠음
[참고] 하지만 부모컴포넌트 -> 자식 컴포넌트 식으로 props전송은 가능 해서 이런식으로 해야할 수 밖에 없음
<App>
<Detail>
<TabCon>
</TabCon>
</Detail>
</App>
이런 구조라면 App컴포넌트의 shoes를 TabCon으로 넘기려면 차례대로 넘길 수 밖에 없음
Q. shoes를 TabCon컴포넌트 안에서 쓰려면?
[답] <TabContent shoes={props.shoes}, tab={tab} />
...
function TabContent({tab, shoes}) {
return <div>{shoes[tab].title}</div>;
}
지금은 3중첩밖에 안되어 있어서 그렇지 만약 컴포넌트가 10번중첩이 되었다면? 9번10번 props를 써야함..

props싫으면

1. ContextAPI(리액트 기본문법) 2. Redux등 외부라이브러리
   ContextAPI쓰면 props전송없이 state공유가능 - 실전에서는 많이 쓰지는 않음
   [단점] 1. 성능이슈 2. 컴포넌트 재활용이 어려움
   즉 그냥 일단 알고만 넘어가자..
1. App.js) let [storage] = useState([10, 11, 12]); 새 state추가
1. Detail, TabComponent에서 쓰고싶음 > 코드 어떻게??
1. props쓰면 되겠지만 ContextAPI를 써보자(이러면 자식은 props없이 state사용가능)
   4(셋팅1). App 컴포넌트 밖에 let Context1 = createContext(); // 컨텍스트를 하나 만든다 = 즉 컨텍스트는 보관함이라고 생각 ㄱ
   5(셋팅2). <Context>로 원하는 컴포넌트 감싸기
   <Route path="/detail/:id" element={
   <Context1.Provider >
   <Detail shoes={shoes}/>
   </Context1.Provider>
   } />

6(셋팅3). value={{ state1, state2 ...}}
<Context1.Provider value={{storage, shoes}}>이런식으로 코드 짜주면 됨 7.이러면 보관함으로 감싼 <Detail> 여기 안의 모든 컴포넌트는 storage, shoes가 사용가능해진다. 8. state사용은 1. Context를 import , ( export let Context1 = createContext(); export키워드 붙여주자)
import {Context1} from "./../App.js" 9. state사용은 2. useContext(Context) ( 보관함을 해체해주는 함수임 react임포트 걸어야함 )
(콘솔에 출력해보면 자료들이 나열되어 있음 ) 10. 디스트럭쳐링문법으로 let {storage, shoes} = useContext(Context1); 이렇게 쓰면 html아무데나 state가 잘나옴 11. 이제 props없이 state사용이 가능해짐 + Detail 뿐만 아니라 그 자식들도 props없이 사용이 가능해진다.

function TabContent({tab, shoes}) {

let [storage] = useContext(Context1); // 추가된 코드
return <div>{shoes[tab].title}</div>;
}
이런식으로 사용하면 됨 ( 자손 컴포넌트도 state를 편리하게 이용함 )
[참고] 편한지 모르겠다면 쓰지마셈
[단점] 1. state변경시 쓸데없는 것까지 재랜더링 {storage}안쓰는 놈들도 무조건 재랜더링이 됨 + 자식컴포넌트까지 비효율적으로 재랜더링됨
[단점] 2. 나중에 컴포넌트 재사용이 어려움 Context1이 없다고 하고 막... 그렇게 될 수 있음
[요약] 간단한 프로젝트에는 사용하기 편하긴 하겠으나 , 보통은 Redux같은 외부라이브러리를 사용한다고 함.

14강
장바구니페이지만들기 & Redux 1: Redux Tookit설치
장바구니페이지: 표 레이아웃으로 만들것임 ( routes/Cart.js만들어서 Routes element에 붙일 것임)
리액트 부트스트랩에서 복붙할 것임- <Table>태그 활용 import / export설정해주면 됨
Table태그

1.  tr 넣으면 가로줄 생김
    1-1. th, td 넣으면 열 하나가 생김 4개쓰면 4열이만들어짐
2.  td 넣으면 세로줄이 생김
    2-1 td 로 줄이 생김
3.  thead는 맨 윗줄
4.  tbody는 몸통부분 ( 액셀 표 부분 생각 )

      <div>
          <Table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>상품명</th>
                  <th>수량</th>
                  <th>변경하기</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>1</td>
                  <td>안녕</td>
                  <td>안녕</td>
                  <td>안녕</td>
              </tr>
          </tbody>
          </Table>
      </div>

장바구니데이터를 state에 보관해두고 데이터바인딩해봅시다. ( 맨날맨날변동 될테니 )
[문제] Q장바구니 state가 App, Detail, Cart에 필요하면 state를 어디 만들어야하나요? - props전송이 귀찮아짐
[해결] Redux ! ( props전송없이도 가능 )

Redux : 컴포넌트들이 props없이 state공유가능
[특징] redux store.js파일을 만들고 거기에 state를 모두 저장시킴 이걸 모든컴포넌트들이 직접 가져서 쓸 수 있게 됨
[특징] 대규모 프로젝트에 적합해서 리액트 구인시 대부분 Redux 요구
[설치] 1. Redux 라이브러리 설치 (react, reactdom 18.1버전이상) 2. npm install @reduxjs/toolkit react-redux 터미널에 입력 3. 셋팅1. store.js파일생성 4. 셋팅2. 코드 복붙
import { configureStore } from "@reduxjs/toolkit";

      export default configureStore ({
         reducer: {
         }
      })
      5. 셋팅3. index.js가서 <Provider store={store}>쓰기
      root.render(
         <React.StrictMode>
           <Provider store={store}>
           <BrowserRouter>
             <App />
           </BrowserRouter>
           </Provider>
         </React.StrictMode>
      );
      6. 셋팅4. import {store} from "./store.js" 쓰기
      7. 이후 모든 자식들은 store에 있던 state전부 사용가능해짐

[문제]Q. 기본 내보내기 / 명명된 내보내기

1.  기본 내보내기 (Default Export)
    파일당 하나의 값만 기본으로 내보낼 수 있습니다.
    주로 모듈에서 가장 중요한 함수, 클래스, 객체 등을 내보낼 때 사용됩니다.
    기본 내보내기를 가져올 때는 임의의 이름으로 불러올 수 있습니다.
    ex)store.js]// store를 기본 내보내기로 설정
    const store = configureStore({
    reducer: {
    // 여기에 리듀서 추가
    }
    });
    export default store;
    index.js] // 기본 내보내기 가져오기: 원하는 이름으로 가져올 수 있음
    import store from "./store.js";
    기본 내보내기는 항상 import [이름] from "파일경로"의 형태로 가져오며, store라는 이름은 파일 내에서 정한 것이 아니므로 다른 이름으로도 가져올 수 있습니다.

2.  명명된 내보내기 (Named Export)
    파일 내에서 여러 개의 값을 명명된 내보내기로 내보낼 수 있습니다.
    export const 또는 export function과 같은 방식으로 내보내기를 지정합니다.
    가져올 때 반드시 내보낸 이름 그대로 가져와야 합니다.
    ex) store.js]
    // store를 명명된 내보내기로 설정
    export const store = configureStore({
    reducer: {
    }
    });
    index.js] // 명명된 내보내기 가져오기: 반드시 내보낸 이름 그대로 가져와야 함
    import { store } from "./store.js";
    명명된 내보내기는 import { [이름] } from "파일경로"의 형태로 가져오며, 대괄호 {}를 사용해야 합니다. 이름을 다르게 가져올 수 없고, 정확하게 store로 가져와야 합니다.

15강. Redux 2 : store에 state보관하고 쓰는 법
Redux왜씀? : 컴포넌트간 state공유가 편해짐 (직접통신해서 고류함 - props전송이 필요없음)
ex) store.js]
import { configureStore, createSlice } from "@reduxjs/toolkit";

// useState같은걸 store밖에 만듬
let user = createSlice({
name : 'state이름',
initialState : 'kim"
})

export default configureStore ({
reducer: {
// 여기에 리듀서 추가 (등록해야 사용가능함 createSlice가 다가 아님)
작명 : user.reducer // user : user.reducer이렇게 해도 됨
}
})
이렇게 사용하면 됨 갖다 써볼 것임 = useSelector()훅을 씀 )( Redux store 가져와줌 )
ex) Cart.js]

function Cart() {

    let a = useSelector((state) => {return state})
    ..}

이런식으로 변수에 설정해놓으면 ( 화살표함수 형식은 문법임 + 변수에 저장해놓기 )
콘솔창에 해보면 유저가 잘 출력되는 것을 확인할 수 있음
console.log(a) // {user: 'kim'}
console.log(a.user) // kim부분만 출력됨 ( object데이터이므로 이런식으로 접근도 가능 )

즉 컴포넌트가 많아지면 리덕스로 props전송이 편해질 수 있음

// useState역할
let user = createSlice({
name : 'user',
initialState : "kim"
})

let stock = createSlice({
name : 'stock',
initialState: [10, 11, 12]
})

export default configureStore ({
reducer: {
user : user.reducer,
stock : stock.reducer
}
})
이렇게 저장도 가능

[참고]
let a = useSelector((state) => {return state})
여기서 state부분은 store안에 있던 모든 state가 됨 - 즉 어떤 state , 원하는 부분만 나올 수 있도록 할 수 있음
let a = useSelector((state) => {return state.user})
console.log(a) // kim만 남음
let a = useSelector((state) => {return state.stock})
console.log(a) // [10, 11, 12]만 나옴
[참고] useSelecto편하게 쓰려면 return이 생략할 수 있다
let a = useSelector((state) => {return state.stock})
let a = useSelector((state) => state)

[문제]
Redu쓰면 편한데 Props왜 씀? - 코드가 더 길어버려짐
간단한 프로젝트는 그냥 props가 좋음
하지만 10개 20개 넘거자면 Redux가 나을듯

[참고]
Redux쓴다고해서 모든 state를 store에 넣지맙시다
즉 컴포넌트간 공유가 필요 없다면  
안에서만 사용 하면 그냥 useState()써도 됨

[다음강의예고]
강의 하단 데이터를 store에 보관하고 장바구니 페이지에서 데이터 바인딩하기

16강 store의 state 변경하는 법: dispatch요청
[저번시간]state만들고 <Cart>에 보여주기
[문제] state에 저장된 상품이 100면? - 상품 갯수에 맞게 <tr>만들어 주세요
[해결] map 함수를 활용해주면 됨.
{state.prchs.map((a, i) => (

<tr>
<td>{prchs[i].id + 1}</td>
<td>{prchs[i].name}</td>
<td>{prchs[i].count}</td>
<td>no</td>
</tr>
))}
이런식으로 변경
[주의]반복문을 쓰면 tr에 key={i}속성 추가해주는게 좋음

Redux의 state변경하는 법 :
kim 을 John Kim으로 변경하고싶다면?
// useState역할
let user = createSlice({
name : 'user',
initialState : "kim"

// state수정해주는 함수 만들고

})
// 원할 때 그 컴포넌트에서 그 함수 실행해달라고 store.js에 요청해주는 방식임
[why?] store.js 수정함수를 미리 따로 만들어놓고 컴포넌트는 이 것을 부탁하는 식으로 코드를 짜면 훨씬 코드추적이 쉬워짐 (즉 범인찾을 때 store.js만 뒤지면 됨)

[수정하는방법] 3~4step

1. state수정해주는 함수 만들기
   reducers : { changeName(state) { return 'john' + state}, ssdsq() {}, .. } // state를 john kim으로 만드는 changeName을 추가할 수 있음
2. 만든 함수를 export 해야함 (reducers안에서는 export 삽입이 안됨
   user.actions // state보관함명.actions = state변경함수들이 남음
   export let { export하고싶은 함수명들삽입 } = user.actions // 관습적인 코드과정임
   // 디스트럭쳐링문법임 오른쪽 자료를 변수로 쉽게 빼기 위한 문법이며 이를 쉽게 export하기위한과정임
3. 만든 함수 import해서 사용
4. 그냥 쓰기전에 한가지 작업이 필요함 ( dispatch안에 한번 감싸서 state변경함수를 넣어야함 )
   Cart.js] let dispatch = useDispatch() // store.js로 요청을 보내주는 함수임
   {state.prchs.map((a, i) => (
   <tr key={i}>
   <td>{prchs[i].id + 1}</td>
   <td>{prchs[i].name}</td>
   <td>{prchs[i].count}</td>
   <td>
   <button onClick={() => dispatch(changeName())}>+</button>
   </td>
   </tr>

[이유] Redux만든사람이 이렇게 쓰세요
[이유] 실은 좋은 방식입니다( 버그 방지에 유리)
[과정] 수정함수를 store에 미리 만들어놓고 컴포넌트에서 실행하도록 해주는 것임 dispatch(changeName) 은 수정함수를 실행해달라고 메세지만 store에게 부탁함
[why?] store.js 수정함수를 미리 따로 만들어놓고 컴포넌트는 이 것을 부탁하는 식으로 코드를 짜면 훨씬 코드추적이 쉬워짐 (즉 범인찾을 때 store.js만 뒤지면 됨)

17강 state가 object나 array인 자료인 경우에 state변경하는 법
ㄴ 조금 특이함
ex) store.js]
// useState역할
let user = createSlice({
name: "user",
initialState: { name : 'kim', age : 20 }, // object로 변경
reducers: {
changeName() {
return "johnkim";
},
},
});
[Q] {name: 'kim'}을 {name: 'park'}으로 바꾸려면?
reducers: { changeName(state) { return { name : 'kim', age : 20 }}}
reducers: { changeName(state) { state.name = 'park' } } 이렇게 해도 됨 (immer 도움)
ㄴ 그래서 문자하나만 필요해도 일부러 오브젝트자료형{}안에 담기도 함 ( 리턴문없이 수정이 편하니까 )

[결론]array/object의 경우 리턴문을 안쓰고 직접 수정해도 state가 변경됩니다.
changeName(state) { state.name = "park"; }, immer.js가 자동으로 설치되어 있어서 가능
[주의] export해주는거 무조건 해줘야함 + 물론 import도 + dispatch안에 설정해야하는 것도
export let { changeName, increase } = user.actions;

함수의 파라미터 문법: increase(state, a) .. dispatch( increase(10)) , dispatch(increase(100))

같은 함수로 다른 기능을 가진 매서드 사용 가능
[Q]가끔 +1 말고 +10도 해주고싶은데요 = state변경함수에 파라미터 뚫는 법
increase2(state){ state.age += 1}
increase2(state, a ){ state.age += a} // increase(100)
increase2(state, a ){ state.age += a.payload} // increase(100)
[참고] payload를 꼭 해줘야함 - 파라미터자리에 입력했던 숫자가 이곳에 들어온다는 뜻임

[참고] payload를 적는 이유 ? 메세지에 화물을 실어보낸다는 개념임
[참고] 파라미터는 보통 a 가 아닌 action으로 작명해서 코드함 - 이 안에 택배, 화물뿐 아니라 action에 대한 정보들도 들어 있어서 그럼
[참고] state변경함수를 action이라고 작명하면 됨

코드 분할
코드 길면 알아서 import export쓰면 되는 것
user라는 변수가 너무 길면 다른 파일을 만들어서 거기에 넣음
store폴더 > userSlice.js 만들어서 거기에 user변수를 넣으면 됨 > 이후 export import설정 > store.js에 import해서 정리 >

> 함수의 export부분도 userSlice에 옮김 > 함수부분을 사용하는 Cart부분의 import 주소도 정리

[Q] +버튼 누르면 수량이 +1 되는 기능 ( n번째 버튼누르면 n번째 상품 +1)
= 하지만 state순서는 그대로인데 표 순서만 바뀌면 어떻게 할 것임? -> 0번째 상품과 실제 버튼 누르는 것이 달라질 수 있음
[hint]장바구나 상품에 있는 id부분을 활용해주면 될듯 - 이버튼을 누르면 옆에 있는 id를 가져오고 - id와 똑같은 id를 가진 상품의 수량을 올릴 수 있도록 진행

[Q] Detail페이지 에서 주문하기 버튼을 누르면 장바구니 state에 항목을 하나 추가해주는 방식
즉 주문하기 버튼을 누르면 밀어넣게 진행

18강 Redux 5 : 장바구니 기능 만들기 숙제 & 응용문제
[Q] 수량+기능 만들기
state수정은 1수량함수만들고 2export만들고 3.import해서 사용
reducers : {
addCount(state) {
state[0].count++
}
}

여기서 파라미터를 추가해서 함수를 재활용가능하도록 진행

addCount(state, action) {
state[action.payload].count++
}
이런식으로 진행

export let { addCount } = cart.action;

이후 Cart.js에서 import 해와서 dispatch(() =>addCount(i)) ( map함수안이라서 0번째 1번째 정해짐)
정렬버튼을 누르면 가나다로 순서가 변경될 시에 오류가 생길 수 있음
0번째 버튼을 누르면 옆에 있는 id를 가져오고 이와 똑같은 id를 가진 상품을 + 시켜줌 이런식으로 코딩 ㄱ

dispatch(() =>addCount(state[i].id)) 이런식으로 가져오고

reducers : {
addCount(state) {
state.findindex((a)=>{ return 조건식}) // a는 하나하나의 데이터 findindex는 배열에서만 가능

let score = state.findindex((a)=>{ return a.id == action.payload}) // 비교를 해서 같은게 나왔다면 몇번째에 있는지 남겨줌
if (score) {
score.count++
}
}

-> 자바스크립트 기초실력문제가 됨

[Q2] 버튼누르면 state에 상품추가
함수 추가 addItem (state, action) {
state.push(action.payload)
}

주문하기 버튼에서 onClick={()=> {dispatch(addItem({id: 1, name: 'Red Knit', count:1}))}}

[마무리_정리]Redux를쓰면 state가 편하게 공유 가능
수정을 하고싶으면 수정함수만들고 export import 해서 dispatch안에 사용하면됨
Redux Toolkit임 이제까지 배운건 - 이게 더 개선된 것임

[응용1]상품마다 각각다른 현제페이지에 있는 상품제목, 아이디, 등을 넣어주도록 코드를 짜보는 것
[응용2]삭제기능 // findIndex함수 활용
[응용3]중복상품은 추가x(상품이 있다면 카운트만 1증가시키도록 코드를 짜보자 ) // addCartList에 수정 (같은 id 유무로 해결)

19강 리액트에서 자주쓰는 if문 작성패턴 5개
지금까지는 JSX를 이용해서 html작성하고 있음
if문을 써서 조건부로 html을 보여주고 싶을 때가 있음
지금까지는 삼항연산자만 주구장창 사용했는데, 또 어떤 if문들을 쓸 수 있는지 맛만 보자. (이런게 있다고 체크만 ㄱㄱ)

1. 컴포넌트 안에서 쓰는 if/else
   function Component() {
   if (true) {
   return <p>참이면 보여줄 html</p>
   } else { // [참고]여기서의 else는 생략이 가능 [참고] if - else if - else 이것도 if두개로 축약이 가능함
   return null;
   }
   }

   > > 컴포넌트에서 JSX를 조건부로 보여주고 싶으면 그냥 이렇게 씁니다.
   > > 우리가 자주 쓰던 자바스크립트 if문은 return() 안의 JSX 내에서는 사용불가입니다

   <div>if(){}</div>이게 안된다는 소리..
   그래서 보통 return + JSX 전체를 보여주는 if문을 작성해서 사용합니다.

2. JSX안에서 쓰는 삼항연산자
   영어로 간지나게 ternary operator 라고 합니다.
   조건문 ? 조건문 참일때 실행할 코드 : 거짓일 때 실행할 코드
   function Component() {
   return (
   <div>
   {
   1 === 1
   ? <p>참이면 보여줄 html</p>
   : null
   }
   </div>
   )
   }
   > > 삼항연산자는 그냥 if와는 다르게 JSX안에서도 실행가능하며 조건을 간단히 주고 싶을 때 사용함

- 삼항연산자는 중첩 사용도 가능하다
  function Component() {
  return (
  <div>
  {
  1 === 1
  ? <p>참이면 보여줄 html</p>
  : ( 2 === 2
  ?<p>안녕</p>
  :<p>반갑</p>
  )
  }
  </div>
  )
  }
  > > 하지만 코드 해석이 어려움 그냥 return 바깥에서 if else 쓴다음 결과를 변수로 저장, 그 변수를 집어넣든 하자

3. &&연산자로 if역할 대신하기
   [참고]-문법 자바스크립트에선 &&연산자라는게 있다.
   "그냥 왼쪽 오른쪽 둘다 true면 전체를 true로 바꿔주세요~"
   true && false; true&&true; 왼쪽의 코드는 false , 오른쪽은 true로 남는다.
   근데 JS는 &&기호로 비교할 때 true와 false를 넣는게 아니라 자료형을 넣으면
   true && '안녕'; // '안녕'
   false && '안녕'; // false
   ture && false && '안녕'; // false
   즉 자바스크립트는 그냥 &&로 연결된 값들 중에 처음 등장하는 falsy 값을 찾아주고 그게 아니면 마지막값을 남겨준다 이렇게 이해하면 됨

html 조건부로 보여줄때 이걸 활용하는 경우가 많음
"만약에 이 변수가 참이면 <p></p>를 이자리에 뱉고 참이 아니면 null뱉고" = UI만들때 이런거 매우 자주 씀- &&연산자로 쓰면 됨
function Component() {
return (

<div>
{
1 === 1
? <p>참이면 보여줄 html</p>
: null
}
</div>
)
}

function Component() {
return (

<div>
{ 1 === 1 && <p>참이면 보여줄 html</p>}
</div>
)
}

> > 즉 위의 두 예제는 동일한 결과를 보여줌

4. switch / case 조건문
   if문이 중첩해서 여러개 달려있는 경우에 가끔 사용함
   function Component2() {
   var user = 'seller';
   if (user === 'seller') {
   return <h4>판매자 로그인</h4>
   } else if ( user === 'customer') {
   return <h4>구매자 로그인</h4>
   } else {
   return <h4>그냥 로그인</h4>
   }
   }
   이렇게 연달아 if문을 사용하는 경우
   function Component2() {
   var user = 'seller';
   switch(user) {
   case 'seller' :
   return <h4>판매자 로그인</h4>
   case 'customer' :
   return <h4>구매자 로그인</h4>
   default :
   return <h4>그냥 로그인</h4>
   }
   }
   > > switch문법 쓰는 방법:

1)  switch(검사할변수) {} 작성
2)  그 안에 case 검사할 변수가 이거랑 일치하냐 :
3)  그래서 이게 일치하면 case : 밑의 코드를 실행
4)  default: 는 그냥 맨 마지막에 쓰는 else와 동일

장점: if문 연달아쓸 코드가 약간 줄어들 수 있음
단점: 조건식란에 변수하나만 검사할 수 있다는 것

5. object/array 자료형 응용
   "경우에 따라서 다른 html 태그등을 보여주고 싶은 경우"
   if문 여러개 혹은 삼항 연산자 여러개를 작성해야할텐데..
   예를 들면 쇼핑몰에서 상품설명부분을 탭으로 만든다고 가정)
   탭은 그냥 경우에 따라서 상품정보/ 배송정보/ 환불약관 내용을 보여주고싶은 것
   현재 state가 info면 <p>상품정보</p>
   현재 state가 shipping이면 <p>배송정보</p>
   현재 state가 refund면 <p>환불약관</p>
   이런것들..

일단 state만들어놓고 if문으로 state를 검사하는 문법을 써야할 거 같지만,
이번엔 if문이 아니라 자바크립트 object자료형에 내가 보여주고 싶은 HTML을 다씀
function Component() {
var currentState = 'info';
return (

<div>
{
{
info : <p>상품정보</p>,
shipping : <p>배송관련</p>,
refund : <p>환불약관</p>
}
}
</div>
)
}
>>원래 JSX상에서 html태그들은 저렇게 object에 담든, array에 담든 아무 상관없습니다.
암튼 이렇게 object 자료형으로 HTML을 다 정리해서 담은 다음 ( { 키 : 값 }형태 )
마지막에 object{}뒤에 []대괄호를 붙여서 "key값이 현재상태인 자료를 뽑겠습니다"라고 써놓는 겁니다.

그럼 이제 현재상태라는 변수의 값에 따라서 원하는 HTML을 보여줄 수 있습니다.
만약에 var 현재상태가 info면 info항목에 저장된 태그가 보여질 것이고,
다른 상태라면 그 항목에 저장된 것들이 보여질 것입니다.

혹은 변수에 저장해서 써도 깔끔해질 것 같긴 합니다

var TabUI = {
info : <p>상품정보</p>,
shipping : <p>배송관련</p>,
refund : <p>환불약관</p>
}

function Component() {
var CurrentState = 'info';
return (

<div>
{
TabUI[CurrentState]
}
</div>
)
}

사실 리액트처럼 html css js를 한 곳에 비비면 어떻게 해도 코드가 어려워질 수 밖에 없긴합니다.

20강 localStorage로 만드는 최근 본 상품 기능 1
브라우저 새로고침하면 state값이 초기값으로 돌아감 -> 처음부터 다시 읽기 떄문 ( 정상임 )
새로고침해도 영구적으로 저장하려면 서버로 보내서 DB에 저장해놓으면 됨
아니면 차선책으로 localStorage에 저장하면 반영구적으로 저장가능 - 브라우저 안에 있음
브라우저) 개발자 도구) applicationTab) Local Storage

1. Key : Value형태로 저장 가능 ( 직접 더블클릭으로 저장 가능 )
2. 최대 5MB까지 문자형태로만 저장이 가능 ( 사이트마다이고 사실 어마어마한 양임 )
3. 사이트 재접속해도 남아있음 ( 브라우저 청소하면 삭제됨 )
   [참고]SessionStorage = 브라우저 끄면 날라감 ( 휘발성있는 데이터는 여기를 사용하면 됨 )
   콘솔에 저장시키는 방법 있음

1) 데이터 저장:
   localStorage.setItem('이름','값')
   > localStorage.setItem('age',20);
   > 이렇게 하면 실제로 로컬스토리지에 데이터가 저장되는 것을 볼 수 있음
2) 데이터 출력:
   localStorage.getItem('이름')
   > localStorage.getItem('age') // '20' 숫자로 저장했어도 문자로 출력됨
3) 데이터 삭제:
   localStorage.removeItem('이름)
   > localStorage.removeItem('age') // 삭제됨
   > [Q]데이터 수정은? - 데이터 수정하는 문법은 없음..
   > 그냥 데이터를 다시 꺼내서 수정하고 다시 집어넣으면 된다.(귀찮음..)

세션스토리지는 전부다 sessionStorage. 으로 바꾸면 됨

[Q]array, object자료형은 어떻게 저장? JSON형태로 바꿔주면 됩니다.
App.js]
function App() {
let obj = {name: 'kim'}
localStorage.setItem('data', obj)
}

> > 이런식으로 저장하게 되면 localStorage에서 key는 data , value는 [object, Object]로 보임
> > [참고] [object Object]는 객체자료형이 깨진 것임
> > 즉 , 직접 집어넣을 수 없다. = JSON형태로 바꾸면 된다.

let obj = {name: 'kim'}
JSON.stringify(obj);
localStorage.setItem('data', obj)

이런식으로 진행하면 따옴표 쳐진 JSON자료 형태로 잘 저장이 됨.
축약형) let obj = { name : 'kim'}
localStorage.setItem('data', JSON.stringify(obj));
[단점] JSON으로 저장했으므로 거낼 때도 JSON형태로 나오게 된다. 따옴표가 쳐져있는 모습
let output = localStorage.getItem('data');
console.log(output); // {"name":"kim"}

[보완]JSON -> array/object 변환은 JSON.parse()
console.log(JSON.parse(output)); // object형태로 출력 = {name: 'kim'}
console.log(JSON.parse(output).name); // 값만 출력 = kim

[Q]최근 본 상품 UI를 만들자 메인페이지에 진열
상세페이제에서 봤던 상품의 번호들을 localStorage에 저장하기 //
저장은 그럼 어떤 형식으로? -> 자료의 이름을 watched로 하고 값을 []형태로 저장해놓기
이후 [0]번 상품을 보면 0을 저장, 1번 상품을 봤다면 1을 또 저장하기 이런식으로 해놓기
1번상품을 여러면 보면 1을 계속 추가해줄것임? -> 즉 중복번호는 막도록 코딩하자 ( Set자료형쓰면 중복제거 쉬울 수도 )

[]이게 먼저 있어야할듯

App.js] useEffect(()=> {
localStorage.setItem('watched', JSON.stringify([]))
}, [])

이렇게 하면 처음 접속했을때 만들어 줌 -> array자료가 생성 -> 데이터 추가하거나 수정가능해짐 ->
array자료형 저장하고싶으면 JSON.stringify 적용해야함

21강 localStorage로 만드는 최근 본 상품 기능 2

코드한줄도 못적겠다??
[코딩팁]
코드 짜는 법을 모른다면? -우리는 컴퓨터한테 명령내리는 것임
최근 본 상품 기능만들어 > 컴퓨터한테 하나하나 상세히 설명해야 알아들을 것임
즉, 추상적인 설명이 아니라 Detail페이지에 접속하면 상품번호가져와서 로컬스토리지에 watched항목에 보관해라 이런식으로 해야함

1. 한글먼저 쓰고 코드로 옮기는게 맞음 ( 자바스크립트로 번역하는 것임 )
2. 아주 상세히 설명할수록 코딩을 잘하는 놈이다.
3. 고수들 강의? 다들 한글먼저 짭니다 ( 머릿속에서 )

Detail.js]
useEffect로 진행 로드되었을때 특정 코드를 실행할 수 있으므로 이걸로 진행
let findGoods = props.shoes.find((x) => x.id == id);
useEffect(() => {})
이후 현재페이지의 id값을 가져와야함 -> findGoods.id

수정을 해야하므로 getItem으로 꺼내고 > JSON파일로 바꾸고 > id값을 push > 다시 저장(JSON형식으로)
useEffect(() => {
const viewedGoods = localStorage.getItem("watched"); // 꺼내고
viewedGoods = JSON.parse(viewedGoods);
viewedGoods.push(findGoods.id);
localStorage.setItem("watched", JSON.stringify(viewedGoods)); // 다시 저장
}, []);

[Q]이미 있으면 push()하지마라
조건문으로 하면 편하긴함 > 편법???
array에서 중복제거 쉽게하려면 Set자료형써도 됩니다.
array > set > array

useEffect(() => {
const viewedGoods = localStorage.getItem("watched"); // 꺼내고
viewedGoods = JSON.parse(viewedGoods);
viewedGoods.push(findGoods.id);
viewedGoods = new Set(viewedGoods); // set자료형으로 변환해서 중복제거
viewedGoods = Array.from(viewedGoods); // 다시 array자료형으로 변환
localStorage.setItem("watched", JSON.stringify(viewedGoods)); // JSON형식으로 array자료형을 저장시킴
}, []);

[Q] 재랜더링시에 초기화되지 않도록 useEffect를 수정?
App.js]
useEffect(() => {
// 로컬 스토리지에 'watched' 키가 없을 때만 초기화
if (!localStorage.getItem("watched")) {
localStorage.setItem("watched", JSON.stringify([]));
}
}, []); // 빈 의존성 배열로 첫 렌더링 시 한 번만 실행

[결론] 사이트 재접속시에도 데이터 유지되게 만들려면 localStorage잘 활용하길..
localStorage에 자동 state를 자동저장? -> 외부 라이브러리를 설치해서진행
ex) 리덕스 쓰는 사람들은 Redux store에 있는 state들을 로컬스토리지에 자동저장시킬 수 있게됨
ㄴ 외부라이브러리이름: redux-persist
[기타] Jotai, Zustand 다른 state 관리 라이브러리 도 있음 한곳에 보관하고 수정하고 진행 가능
ㄴ 이 외부라이브러리에서도 localStorage에서 실시간 state 관리 가능

22강 실시간 데이터가 중요하면 react-query
서버랑 통신하는 기능을 다루다보면 ajax 성공시 / 실패시 html보여주려면? -몇초마다 자동으로 ajax요청?? 실패시 몇초후에 요청재시도? / 다음페이지를 미리 가져오는방법??

근데 이런 것들이 귀찮으면 react-query를 사용하면 적은 코드로 기능개발이 가능해짐
[사용]실시간sns만들때, 코인거래소 등 실시간 데이터를 몇초마다 보여줄때 유용
[설치1]npm install react-query
[설치2]index.js셋팅] const queryClient = new QueryClient() 코드 추가
[설치3]<QueryClientProvider client={queryClient}></QueryClientProvider> 로 감싸주자
[설치4]import는 필수 = 설치완료

1. 서버에서 유저이름 가져와 보여주기
   [예시_코드] https://codingapple1.github.io/userdata/.json
   (여기에 로그인된 유저정보가 있을 것임)
2. ajax요청
   axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
   const data = a.data;
   console.log(data);
   });

이렇게도 가능하지만 리액트쿼리로 진행

1. useQuery('작명', () => { return axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
   return a.data;
   });})
   를 이용해서 ajax요청

이렇게 진행 -> return을 꼭 써야함

2.  변수에 저장
    let result = useQuery('작명', () => { return axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
    return a.data;
    });})
    이렇게 하면 손쉽게 판단이 가능
    [장점1] 성공/실패/로딩중 쉽게 파악이 가능
    result.data //성공하면 true
    result.isLoading //로딩중이면 true
    result.error //실패했을때(에러났을때) true
    [Q]로딩중일 때 '로딩중입니다'보여주고싶으면?
    {}열고
    result.isLoading을 써서 삼항연산자를 활용해서 보여주면 됨
    {result.isLoading ? '로딩중' : result.data.name }
    {result.isLoading && '로딩중' }
    {result.error && '에러남'}
    {result.error && result.data.name}

    [장점2]틈만나면 자동으로 재요청해줌( refetch )
    틈만나면 신선한 데이터를 가져옴
    let result = useQuery("작명", () => {
    return axios
    .get("https://codingapple1.github.io/userdata.json")
    .then((a) => {
    console.log('요청됨') // ajax가 틈만나면 요청되는 걸 파악하기 위함
    return a.data;
    });
    });

    > > ajax요청이 성공했을때마다 console창에 요청됨이 추가됨 ( 다른 페이지에서 넘어가거나 다른 프로그램에서 다시 들어가도 요청이됨)
    > > [Q] 요청시간간격을 설정해주고싶다면?
    > > let result = useQuery(
    > > "a",
    > > () => {

        return axios
          .get("https://codingapple1.github.io/userdata.json")
          .then((a) => {
            console.log("요청됨");
            return a.data;
          });

    },
    { staleTime: 2000 }
    );
    [주의] {staleTime: 2000} 부분은 잘못 입력해도 오류가 나지않음 - 괄호 파악 잘해야함
    [장점3] 실패시 retry알아서 해줌 -실패하면 알아서 재시도함
    ajax요청을 알아서 재시도를 해줌 오류가 나더라도
    [장점4] state공유 안해도 됩니다.
    ajax요청해서 Mark가져오는 코드가 부모 자식 컴포넌트 2개나 있어야함? - > 한번에 하나만 하면 됩니다. state props전송코드가 필요없음
    불안하면 props전송해주면되긴함
    [장점5] ajax결과 캐싱기능 5분동안 기억함
    예를들어 (12시10분에 실행됨)userdata.json GET요청 (12시13분에 실행됨)userdata.json GET요청 ?
    그러면 이전에 했던 결과를 우선 보여줌. 그다음에 GET요청을 함
    이러면 ajax성공하기도 전에 기존 성공결과를 보여주기 때문에 빨라보이는 장점이 있음

[참고] redux-Toolkit설치하면 RTK Query도 자동설치되어 있을듯 -> 이거 배운거랑 유사하지만 문법이 괴랄함..
[참고] 더 이상 배우려면 react-query 공식 사이트 참고

23강 성능개선1 : 개발자도구 lazy import
프로그램을 짜다보면 의도와는 다르게 props가 전송되는 경우가 많을 것임 (제대로 출력이 안됨, img경로가 이상함 )
-> 코드를 확인하거나,, 개발자 도구를 열어보면됨
개발자도구)

1. React Developer Tools
   Elements : html/css검사가능 + style도 체크가능
   나는 컴포넌트 구조같은 걸 미리미리 보고싶다??
   [Tip] chrome.google.com/webstore > React Developer Tools 설치 ㄱㄱ
   이러면 개발자 탭에서 Components를 볼 수있게됨 - 디버깅 찾기가 쉬워짐
   좌상단에 inspect툴을 누르면 컴포넌트 위치파악 +
   현재 선택한 Card컴포넌트의 props를 다 찾아줌
   shoes라는 props i 이런것들을 다 전달되고 있는지 확인 해볼 수 있음 + 간단한 수정도 가능 +
   컴포넌트안의 state이런 것도 가능
   App 컴포넌트의 state 이런 값들도 확인 해볼 수 있음
   props와 state가 어떻게 반영되는지 파악하고싶다면이렇게 확인 해보는 것도 좋음
   우상단-> Card Component의 위치를 코드 어떤위치에 있는지 파악시켜줌
   Profiler -> 성능저하되는 컴포넌트 범인찾기 탭임
   좌상단의 녹화버튼을 클릭하고 여러 버튼을 클릭해봄
   -> 이후 녹화를 끝내면 action들을 다 알려줌 ->
   어떤 컴포넌트들이 랜더링되었는지 알려줌 ->
   Detail Component 등등 어떤 것 파악 가능(몇초 위치 다 알려주기 때문에 범인 색출이 가능)
   (사실 보통은 걱정할 필요가 없음)

- 웹사이트에서의 지연문제는 ajax문제임 즉 서버에서 데이터가 늦게와서 그럼 ( 프론트엔드부분에서는 상관없을듯 )

2. Redux DevTools
   같은 경로로 설치
   프로젝트에 리덕스가 설치되어 있다면, 리덕스 관련탭을 오픈할 수 있을 것임
   어떤 state 변경함수가 동작했는지 그런것들을 다 알려줌
   ex) 수량변경 버튼누르면 addCount함수가 추가 된 로그가 뜨게 됨

3. React = SPA ( sing page application )
   npm run build = 발행
   이는 발행하면 js파일 하나에 모든 코드가 다 들어감
   그래서 사이즈가 매우 클 수 밖에 없음 -> 유저가 메인페이지 접속하면
   1.html파일 2.css파일 3큰 js 파일 모두 다운을 받아서 로딩속도가 느림
   그래서 이를 잘게 분할하고 싶다??
   -> App.js] 여기서 Detail , Cart 컴포넌트가 import되어 있는데,
   사실 이는 메인페이지에선 먼저 로드 할 필요가 없음
   -> 이런 컴포넌트들은 lazy import해라 라고함 ( lazy하게 로딩해라)

import Detail from "./routes/Detail.js";
import Cart from "./routes/Cart.js";
이거 대신에
const Detail = lazy(() => import("./routes/Detail.js"));
const Cart = lazy(() => import("./routes/Cart.js"));
lazy함수를 이용해서 작성
-> 필요해질 때 import해주세요~ -> 자원 절약이 가능해짐
이걸 쓰고 싶으면 ? lazy를 react에서 import
이렇게 하면 사이트 발행할 떄도 별도의 js파일로 분리됨
[단점] 유저가 Detail 이나 Cart 페이지 접속할때
로드 되기 전까지 하얗게 됨 -> 로드 되는 시간동안 안내문, 로딩바를 생성해야할 수도 있음 - Suspence 컴포넌트를 가져와서 감싸면
로딩중 UI를 넣기 가능
<Suspense fallback={<div>로딩중임</div>}>
<Detail shoes={shoes}>
</Suspense>
이런식으로 코드를 짜면 됨
대부분의 Route부분은 lazyload하도록 만들어 놓기 때문에 Routes를 Suspense로 감싸도 상관은 없음
-> 이러면 페이지로딩속도를 개선할 수 있음
-> Suspense로 감싸지 않는다면 오류가 남 ( 일시적으로 UI가 일시적으로 로딩 표시기로 교체되기 때문 )

24강. 성능개선2 : 재렌더링 막는 memo, useMemo
원하는 자식 컴포넌트의 재랜더링을 막고 싶을떈??
ex) Cart컴포넌트안에 자식컴포넌트인 Child컴포넌트를 삽입,
이후 Cart컴포넌트의 변수가 버튼클릭으로 바뀔때 Cart컴포넌트는 재랜더링이 될 것인데, 자식들도 전부 랜더링이 될 것임
만약 자식컴포넌트가 랜더링시간이 오래걸리는 친구라면?
=> 꼭 필요할 때만 재랜더링해주세요라고 코드를 짜줄 수 있는 것임
Child컴포넌트를 만들 때 memo해주면 됨
let Child = memo(function () {
console.log("재랜더링");
return <div>자식임</div>;
});
이런식으로 memo 해주면 이제 꼭 필요할 때만 재렌더링됨
즉 memo로 재렌더링오래걸리는 컴포넌트 감싸놓으면 좋음
[원리] memo 의 원리는 특정상황에서만 렌더링시켜주는 원리
특정 props가 변할 때만 재렌더링 해줌
<Child/> 컴포넌트에 <Child count={count}/>로 해놓으면
자식컴포넌트의 props가 바뀌므로 재렌더링이 진행됨 - 이외에는 렌더링x
하지만 이런식이라면 기존 props === 신규 props 비교하는데도 매우 오래 걸릴 수가 있음 - > props가 길고 복잡하면 손해일 수도 있으므로
온갖 자식 컴포넌트에 붙이면 성능이 오히려 떨어질 수도 있음

useMemo 사용법
Cart컴포넌트안에 어렵고 복잡한 함수가 필요함
function 함수 () {
return 반복문 10억번 돌린 결과
}

function Cart() { let result = 함수();}

- Cart가 재렌더링될 때마다 실행되므로 성능이 떨어짐

[방법] useMemo(() => {return 함수()}) 코드 추가해주면 됨
이런식으로 하면 컴포넌트 렌더링시 1회만 실행해줌 - 안정적동작가능
-useEffect랑 같은 원리 , dependency추가 가능
function Cart() { let result = 함수();
useMemo(() => {return 함수()}, [state]) // dependency추가부분
}
[이유] useMemo useEffect차이점? - 실행시점의 차이임
useEffect는 HTML이 실행이 다 끝나면 실행
useMemo는 랜더링 될때 실행됨

25강 성능개선 3 : useTransition, useDeferredValue
리액트 18버전 이후부터
렌더링 성능이 저하되는 컴포넌트에서 쓸 수 있는 혁신적인 기능이 하나 추가됨
useTransition 이건데 이걸로 오래걸리는 부분을 감싸면 렌더링시에 버벅이지 않게 해줌 ( 코드 실행시점을 조절해주는 기능임 )
리액트 18버전이 신기능

1. batch 쓸데없는 재렌더링 방지기능 ( batching )
   setCount(1)
   setName(2)
   setValue(3) //여기서 1번만 재렌더링됨
   state변경함수들이 쭉 작성되어 있을때 state변경이 일어날때마다 재렌더링이 일어나는 것이 아니라 state3변경 될때만 재랜더링이 1회만 일어남
   ajax setTimeout 등의 내부라면 재랜더링이 다일어났지만,
   fetch().then(() => {
   setCount(1) //재렌더링됨
   setName(2) //재렌더링됨
   })
   18버전부터는 1회만 일어남
2. useTransition 동작이 느린 컴포넌트들의 성능을 향상시킴 (카드 빛 돌려막기)
   function App() {
   let [name, useName] = useState('')

   return (
   <div className="App">
   <input onChange={(e) => {setName(e.target.value)}}/>
   </div>
   )
   }
   input 에 유저가 입력하면 유저가 입력한 값이 name에 저장되도록함

   > 그래서 user가 타이핑할 때마다 name이라는 state에 저장될 것임
   > -> 이런식으로 행복하게 react개발하다 성능저하가 일어남

let a = new Array(10000).fill(0) // 10000개가 채워진 배열
function App() {
let [name, useName] = useState('')

return (

<div className="App">
<input onChange={(e) => {setName(e.target.value)}}/>
{
a.map(() => {
return <div>{name}<div>
})
}
</div>
)
}

타이핑 할때마다 name이라는 state가 변경 >> name변경되면 이것도 렌더링이 되므로 성능이 별로가 됨 >> 키보드 입력했을때 0.2초보다 반응이 늦게 된다 >> 부정적인 UX >>
[해결책1] 보여주는 HTML을 줄여나가는 것
[해결책2] 굳이 10000개를 보여줘야한다면 useTransition 쓰기
let [isPending,startTransition] = useTransition()설정으로 사용

let a = new Array(10000).fill(0) // 10000개가 채워진 배열
function App() {
let [name, useName] = useState('')
let [isPending,startTransition] = useTransition() // 해결책2
return (

<div className="App">
<input onChange={(e) => {setName(e.target.value)}}/>
{
a.map(() => {
return <div>{name}<div>
})
}
</div>
)
}

문제의 state를 감싸줘야함
<input onChange={(e) => {setName(e.target.value)}}/>
이부분이 문제이므로 이부분을 감싸주자
<input onChange={(e) => {stateTransition() => {setName(e.target.value)}}}/>

이러면 아까보다 성능이 조금더 나아진 모습을 볼 수 있음
[원리]브라우저는 동시작업을 하지못함 (single-threaded)
그래서 타이핑했을때 브라우저가 보여줄 것

1 입력한 값을 input에 만들기
2 10000개의 div박스 보여주기
근데 useTransition을 사용하면
코드 시작시점을 뒤로 늦춰줌 ( 우선순위를 정해줌 )
3 먼저 입력한 값을 input에 보여주고
4 한가할 때 div박스 10000개를 만듦( 실행시점을 조절함 )
startTransition = 명시적으로 작명한다면? -> 늦게처리
isPending = startTransition이 처리중일때 true로 변함 ( isLoading과 같음 ) -> 로딩중이라는 동작UI도 보여줄 수 있음
isPending ? '로딩중' :
a.map(() => {
return ( <div>{name}</div>)
})

3. useDeferredValue 써도 느린 컴포넌트 성능향상가능
   function App() {
   let state = useDeferredValue(state) // 이부분

   return ()
   }
   state에 넣은게 변동사항이 생기면 늦게 처리해줌
   늦게 처리를 원하는 게 있다면 여기에 넣자
   나중에 처리한다는 것 = 중요한 작업을 먼저처리하고 이후에 컴포넌트 생성하는 것 = startTransition과 비슷

25강 PWA 셋팅해서 앱으로 발행하기 ( 모바일앱인척하기)
구글이 밀고 있는 PWA (progressive web app)
웹사이트를 안드로이드/ios모바일 앱처럼 사용할 수 있게 만드는 일종의 웹개발 기술
-> 앱으로 발행하는게 아니라 웹사이트 자체를 스마트폰 홈화면에 설치해줌
pc라면 설치시 바탕화면에 아이콘 생김(바로가기 추가 버튼)
[장점1] 설치 비용이 적다. (설치 마케팅 비용이 적음 1000원대 -> 100원대)
[장점2] 소비 주도하는 40대~50대는 웹사이트 접속이 어려워함 > 바로가기를 통해 단순화가 가능해서 접근성에 유리
[장점3] html css만으로 모바일앱까지 가능
[장점4] 푸시알림, 센서(자이로 센서)등이 가능해짐 (앱이 제공하는 기능들 가능)
[한계]설치과정이 이질적임
웹사이트를 간지나게 만들었다면 PWA로 만들어서 앱처럼 쓸 수 있게 만들어보셈

PWA가 셋팅된 리액트 프로젝트를 생성해야함
작업 폴더에서 터미널을 오픈, 생성할때 명령어가 약간 다름
[설치1] npx-create-react-app 프로젝트명 --template cra-template-pwa
pwa가 셋팅이 완료된 프로젝트가 있어야함
이거를 vs코드에서 열어서
[Q]기존 프로젝트를 PWA로 만들려면?
-> 그냥 새 프로젝트만들고 기존코드를 복붙해야함(물론 필요한 라이브러리 설치필수)
[설치2]파일 2개를 만들어야함

1. manifest.json 가 있어야하는데 안에 들어가 있음
   pwa를 위한 기본셋팅들임 ex) manifest.js] short_name은 앱이름임
   다양한 폰 운영체제에 맞는 아이콘 사이즈 + 앱누르면 처음 뜨는 페이지 설정도 가능 ( start_url)
   앱켜면 브라우저 상단바 제거할지 말지 (display: "standalone" )
   배경색도 설정 등등 수백가지 설정이 있음

2. service-worker.js 이것도 만들어져있음
   [설정] index.js에서 unregister(); >> register()로 바꿔주어야함
   [설정] 이후 빌드를 하면 service-worker.js파일이 생성

- 빌드하는 방법 npm run build
  [설정]build폴더가 생성 > 그 안에 manifest.json , service-worker.js가 생성되어 있는 것이 확인됨 (압축된 파일임)
  service-worker파일은 오프라인에서도 사이트를 열 수 있게 도와줌
  ( 모바일 앱들은 오프라인에서도 항상 동작이 가능함)
  비행기모드에서 카카오톡구동은 가능
  카톡 구동가능한 이미지 모든 파일들이 미리 하드에 저장되어 있기 때문임
  웹사이트는 아니므로 (서버에서 html css 파일들을 가져오는 것이므로)
  앱처럼 오프라인에서도 쓸려면 service-worker.js에 html css파일 미리 하드에 저장해둘 것임 (캐싱)
  -> 이 페이지를 접속 할때마다 다운받지말고 하드에 있던거 쓸것이다라는 것임
  -> 이미 셋팅은 되어있긴함
  [설정]asset-manifest.json
  에서 어떤 파일들을 캐싱할건지에 대한 목록들이 나열되어 있음
  html css 이미지 파일 등등  
  이제 오프라인에서도 가능

3. PWA 잘되나 확인하려면
   build된걸 어딘가에 호스팅하거나 index.html미리보기 띄우거나(Open with live server)

- 이건 익스텐션에 live server를 설치해야함
  이후 index.html 오른쪽클릭해서 오픈윗라이브서버 클릭하면됨
- 방금 만든 리액트페이지를 보여줌 -> 설치버튼 강제 띄우기도 가능
  우상단에 설치버튼이 있음
- 또는 Application 부분에서 Manifest부분에서 미리보기 확인 가능
  Service-worker가 어떤식으로 동작하고있는지 확인 가능
  Cash Storage 눌러보면 어떤 파일들을 캐싱하고 있는지 조사가 가능함
  다시 접속했을때 하드에서 불러오는 것이 파악 가능

[Q] 특정파일들을 캐싱 안되게 설정하고 싶다면? (exclude하고 싶다면?)
[방법] node_modules/react-scripts/config.webpack.config.js들어가서
[방법] injectManifest에서 exclude부분에 정규식으로 내가 안되게 설정하고싶은 부분들을 코드 짜주면 됨 /index\.html/ 이러면 됨
