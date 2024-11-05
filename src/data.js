let data = [
  {
    id: 0,
    title: "White and Black",
    img: "https://economist.co.kr/data/ecn/image/2023/02/04/ecn20230204000012.jpg",
    content: "Born in France",
    price: 120000,
  },
  {
    id: 1,
    title: "Red Knit",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj6cuNo1jEkqmkDFuYfLvMT5DWUYg4FDE2Gg&s",
    content: "Born in Seoul",
    price: 110000,
  },
  {
    id: 2,
    title: "Grey Jorden",
    img: `${process.env.PUBLIC_URL + "/col-mg1.jpg"}`,
    content: "Born in States",
    price: 130000,
  },
];

// 대괄호[]안에 중괄호{}가 들어 있음
// object개념

// 한 변수에 여러 자료 넣고싶으면 array로 보관가능
// let a = [1,2,3]
// 자료를 찾고싶다면 index로 파악 가능

// object자료형도 여러 자료를 저장할 수 있다
// array와 object자료형의 차이점?
// key : value 로 정해져 있다.
// ex) let b = { name: "kim", age: 20}
// 자료를 찾고싶다면 b.name이런식으로 .key로 불러온다.

// 현재 data.js는 let data = [{}, {}, {}]이런식으로 구성

// [참고] 복잡한 자료에서 데이터를 뽑을 땐 시작기호만 잘 보면 됩니다
// 시작기호가 []이거면 인덱싱해주면 된다.
// 시작기호가 {}이거면 .으로 접근해서 key로 value를 불러오면 된다.

export default data;
