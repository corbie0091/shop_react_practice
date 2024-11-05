import { Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import Button from "react-bootstrap/Button";
import bg from "./img/bg.png";
import { useState } from "react";
import data from "./data.js";

function App() {
  let [shoes] = useState(data); // data.js파일에서 import
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">OttShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#shop">SHOP</Nav.Link>
            <Nav.Link href="#about">ABOUT</Nav.Link>
            <Nav.Link href="#community">COMMUNITY</Nav.Link>
            <Nav.Link href="#Cart">CART</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="main-bg" style={{ backgroundImage: `url(${bg})` }}></div>
      <div className="container">
        <div className="row">
          {shoes.map((shoes) => (
            <Container2 shoes={shoes} key={shoes.id}></Container2>
          ))}
        </div>
      </div>
      <br />
      <Button variant="primary">구매하기</Button>{" "}
    </div>
  );
}

function Container2(props) {
  return (
    <div key={props.shoes.id} className="col-md-4">
      <img src={props.shoes.img} className="product-img" width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}원</p>
    </div>
  );
}

export default App;
