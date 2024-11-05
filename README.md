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

[숙제시 궁금했던 점]

<div key={props.shoes.id} className="col-md-4">
key값을 분명 코드를 짰지만 html에서 보이지 않아 궁금했다.
검색후:
이는 정상적인 모습으로 key가 누락되었거나 고유하지 않으면, 경고메시지가 나타났을 것으로, 경고가 표시되지 않고 있다는 것은 key값이 잘 설정되어 있다는 반증이 되기도 한다는 것이다. 
+ 검사를 하고싶다면 콘솔창을 확인해보자
console.log("Key:", props.shoes.id); // in 컴포넌트(props)
