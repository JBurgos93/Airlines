import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ViewPage, Error, About, Extras, Clock } from './pages'
import { Footer } from './components/Footer';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css' // Need this so the Bootstrap React components get styled

const App = () => {

    return(
        <div className="flex-wrapper">
            <Navbar bg="primary" expand="lg"  >
                <Container>
                    <Navbar.Brand href="/" className="text-white">Airline Manager</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="extras" className="text-white">View Planes & Airports</Nav.Link>
                            <Nav.Link href="about" className="text-white">About Us</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Clock></Clock>
                </Container>
            </Navbar>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ViewPage />} />
                    <Route path="/view" element={<ViewPage />} />
                    <Route path="/extras" element={<Extras />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;