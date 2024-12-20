import { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context1 } from "../App.js";
import { addCartList } from "../store.js";
import { useDispatch } from "react-redux";
import { useLike } from "../hooks/like.js";

function Detail(props) {
  useContext(Context1);

  let [like, addLike] = useLike();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  let { id } = useParams();
  let findGoods = props.shoes.find((x) => x.id === parseInt(id));
  let [showAlert, setShowAlert] = useState(true);
  let [tab, setTab] = useState(0);
  let dispatch = useDispatch();

  useEffect(() => {
    let viewedGoods = localStorage.getItem("watched"); // 꺼내고
    viewedGoods = JSON.parse(viewedGoods) || [];
    if (!viewedGoods.includes(findGoods.id)) {
      viewedGoods.unshift(findGoods.id);
    }
    viewedGoods = [...new Set(viewedGoods)];
    localStorage.setItem("watched", JSON.stringify(viewedGoods)); // 다시 저장
  }, [findGoods]);
  return (
    <div className="container">
      {showAlert && (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      )}
      <div className="row">
        <div className="col-md-6">
          <img src={props.shoes[id].img} width="100%" alt="" />
        </div>
        <div className="col-md-6">
          {like}{" "}
          <span
            onClick={() => {
              addLike(like + 1);
            }}
          >
            👍
          </span>
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(
                addCartList({
                  id: props.shoes[id].id,
                  name: props.shoes[id].title,
                  count: 1,
                })
              );
            }}
          >
            주문하기
          </button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(0);
            }}
            eventKey="link0"
          >
            NavLink 1 content
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(1);
            }}
            eventKey="link1"
          >
            NavLink 2 content
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(2);
            }}
            eventKey="link2"
          >
            NavLink 3 content
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} shoes={props.shoes} />
    </div>
  );
}

function TabContent({ tab, shoes }) {
  let { storage } = useContext(Context1);
  return (
    <div>
      {shoes[tab].title}
      {storage}
    </div>
  );
}
export default Detail;
