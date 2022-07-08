/*
export const Footer = () => {
    return(
        <h1>
            This is the footer.
        </h1>
    );
}*/
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import "./style.css";

export const Footer = () => {
    return(
        <footer className="footer">
            <span>&copy; Jose Burgos, 2022</span>
        </footer>
    );
}