import { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {Context1} from "../App.js"

function Detail(props) {

useContext(Context1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  let { id } = useParams();
  let [showAlert, setShowAlert] = useState(true);
  let [tab, setTab] = useState(0);
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
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>
          <button className="btn btn-danger">주문하기</button>
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
      <TabContent tab={tab} shoes={props.shoes}/>
    </div>
  );
}

function TabContent({tab, shoes}) {

   let [storage] = useContext(Context1);
    return <div>{shoes[tab].title}</div>;
}
export default Detail;
