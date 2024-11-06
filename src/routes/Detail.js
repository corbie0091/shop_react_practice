import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;

let NewBtn = styled(YellowBtn)``;

let Box = styled.div`
  background: gray;
  padding: 20px;
`;

setTimeout(() => {
  실행할코드;
}, 1000);

function Detail(props) {
  useEffect(() => {
    console.log("안녕");
  });
  let [count, setCount] = useState(0);
  let { id } = useParams();
  return (
    <div className="container">
      <div className="alert alert-warning">2초이내 구매시 할인</div>
      <div className="row">
        <div className="col-md-6">
          <img src={props.shoes[id].img} width="100%" alt="" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}
export default Detail;
