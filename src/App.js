import { Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import bg from "./img/bg.png";
import { useState } from "react";
import data from "./data/data.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import Detail from "./routes/Detail.js";
import About from "./routes/About.js";
import axios from "axios";

function App() {
  let [shoes] = useState(data); // data.js파일에서 import

  let navigate = useNavigate();
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">OttShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/shop");
              }}
            >
              SHOP
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about");
              }}
            >
              ABOUT
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/community");
              }}
            >
              COMMUNITY
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              CART
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<MainPage shoes={shoes} />} />
        <Route path="/shop" element={<div>옷페이지임</div>} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>맴버임</div>} />
          <Route path="location" element={<div>location</div>} />
        </Route>
        <Route path="/community" element={<div>공지사항페이지임</div>} />
        <Route path="/cart" element={<div>장바구니페이지임</div>} />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="*" element={<div>이 페이지는 없는 페이지입니다.</div>} />
      </Routes>
    </div>
  );
}

function MainPage({ shoes }) {
  return (
    <>
      <div className="main-bg" style={{ backgroundImage: `url(${bg})` }}></div>
      <br />
      <div className="container">
        <div className="row">
          {shoes.map((shoe, i) => (
            <Card shoe={shoe} key={shoe.id}></Card>
          ))}
        </div>
      </div>
      <button onClick={() => {
        //ajax 요청 _ ajax이용한 get요청은 axios.get('url')
        axios.get('https://codingapple1.github.io/shop/data2.json').then((result)=>{ console.log(result.data)}).catch(()=>{ console.log('실패함')})

      }}>버튼</button>
    </>
  );
}

function Card({ shoe }) {
  return (
    <div key={shoe.id} className="col-md-4">
      <img src={shoe.img} alt={shoe.img} className="product-img" width="80%" />
      <h4>{shoe.title}</h4>
      <p>{shoe.price}원</p>
    </div>
  );
}

export default App;
