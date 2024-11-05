import { Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import Button from "react-bootstrap/Button";
import bg from "./img/bg.png";

function App() {
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
          <div className="col-md-4">
            <img
              src="https://economist.co.kr/data/ecn/image/2023/02/04/ecn20230204000012.jpg"
              width="80%"
            />
            <h4>상품명</h4>
            <p>상품설명</p>
          </div>
          <div className="col-md-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj6cuNo1jEkqmkDFuYfLvMT5DWUYg4FDE2Gg&s"
              width="80%"
            />
            <h4>상품명</h4>
            <p>상품설명</p>
          </div>
          <div className="col-md-4">
            <img
              src={process.env.PUBLIC_URL + "/col-mg1.jpg"}
              width="80%"
              height={"110px"}
            />
            <h4>상품명</h4>
            <p>상품설명</p>
          </div>
        </div>
      </div>
      <br />
      <Button variant="primary">구매하기</Button>{" "}
    </div>
  );
}

export default App;
