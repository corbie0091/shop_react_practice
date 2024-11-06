import { Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import Button from "react-bootstrap/Button";
import bg from "./img/bg.png";
import { useState } from "react";
import data from "./data.js";
import { Route, Routes, Link } from "react-router-dom";

function App() {
  let [shoes] = useState(data); // data.js파일에서 import
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">OttShop</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/shop">SHOP</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/community">COMMUNITY</Link>
            <Link to="/cart">CART</Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<MainPage shoes={shoes} />} />
        <Route path="/shop" element={<div>옷페이지임</div>} />
        <Route path="/about" element={<div>어바웃페이지임</div>} />
        <Route path="/community" element={<div>공지사항페이지임</div>} />
        <Route path="/cart" element={<div>장바구니페이지임</div>} />
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
    </>
  );
}

function Card({ shoe, key }) {
  return (
    <div key={key} className="col-md-4">
      <img src={shoe.img} className="product-img" width="80%" />
      <h4>{shoe.title}</h4>
      <p>{shoe.price}원</p>
    </div>
  );
}

export default App;
