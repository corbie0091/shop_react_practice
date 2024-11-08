import { Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import bg from "./img/bg.png";
import { createContext, useState } from "react";
import data from "./data/data.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import Detail from "./routes/Detail.js";
import About from "./routes/About.js";
import axios from "axios";
import Cart from "./routes/Cart.js";

export let Context1 = createContext();

function App() {
  let [shoes, setShoes] = useState(data); // data.js파일에서 import
  let [storage] = useState([10, 11, 12]); 
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
        <Route path="/" element={<MainPage shoes={shoes} setShoes={setShoes} />} />
        <Route path="/shop" element={<div>옷페이지임</div>} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>맴버임</div>} />
          <Route path="location" element={<div>location</div>} />
        </Route>
        <Route path="/community" element={<div>공지사항페이지임</div>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/detail/:id" element={
        <Context1.Provider value={{storage, shoes}}>
          <Detail shoes={shoes}/>
        </Context1.Provider>
           } />
        <Route path="*" element={<div>이 페이지는 없는 페이지입니다.</div>} />
      </Routes>
    </div>
  );
}

function MainPage({ shoes, setShoes }) {
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
        axios.get('https://codingapple1.github.io/shop/data2.json')
        .then((result)=>{ console.log(result.data)
        let copy = [...shoes, ...result.data];
        setShoes(copy)
      })
        .catch(()=>{ console.log('실패함')})
        
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
