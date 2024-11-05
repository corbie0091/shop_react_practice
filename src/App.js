import { Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import Button from "react-bootstrap/Button";

function App() {
  return (
    <div className="App">
      <Button variant="primary">Primary</Button>{" "}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;
